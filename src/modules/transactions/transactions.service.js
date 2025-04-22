import {
  bulkInsertTransactions,
  fetchCountTransactions,
  fetchTransactionById,
  fetchTransactions,
  insertTransaction,
  putTransactionAndUpdateBalance,
} from "./transactions.repository.js";

import { fetchAccountById } from "../accounts/accounts.repository.js";

import { DateTime } from "luxon";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchClientById } from "../clients/clients.repository.js";

export async function createTransaction(
  fastify,
  date,
  type,
  amount,
  currency,
  accountId
) {
  const account = await fetchAccountById(fastify, accountId);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cuenta con id ${accountId}.`,
    };

  const formatedTransactonDate = DateTime.fromISO(date, { setZone: true })
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");

  const result = await insertTransaction(
    fastify,
    formatedTransactonDate,
    type,
    amount,
    currency,
    accountId
  );
  return { id: result.insertId };
}

export async function bulkCreateTransactions(fastify, transactions, accountId) {
  const account = await fetchAccountById(fastify, accountId);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cuenta con id ${accountId}.`,
    };

  const parsedTransactions = transactions.map((t) => {
    const parsedDate = DateTime.fromISO(t.date, { setZone: true })
      .toUTC()
      .toFormat("yyyy-MM-dd HH:mm:ss");

    return {
      ...t,
      date: parsedDate,
    };
  });

  const affectedRows = await bulkInsertTransactions(
    fastify,
    parsedTransactions,
    accountId
  );

  return { affectedRows: affectedRows };
}

export async function getTransactions(
  fastify,
  status,
  clientId,
  limit,
  offset,
  page,
  amount,
  from,
  to,
  sort,
  order
) {
  if (clientId) {
    const client = await fetchClientById(fastify, clientId);

    if (!client)
      throw {
        isCustom: true,
        statusCode: 404,
        errorType: ERROR_TYPES.NOT_FOUND,
        message: `No se encontró cliente con id ${clientId}.`,
      };
  }

  const transactions = await fetchTransactions(
    fastify,
    status,
    clientId,
    limit,
    offset,
    amount,
    from,
    to,
    sort,
    order
  );

  const mappedTransactions = transactions.map((transaction) => ({
    ...transaction,
    clientAmount: transaction.commissionAmount
      ? transaction.amount.minus(transaction.commissionAmount)
      : null,
  }));

  const totalTransactions = await fetchCountTransactions(
    fastify,
    status,
    clientId,
    amount,
    from,
    to
  );
  const totalPages = !limit ? 1 : Math.ceil(totalTransactions / limit);

  return {
    data: mappedTransactions,
    total: totalTransactions,
    page: page,
    pages: totalPages,
    limit: limit ?? 0,
  };
}

export async function updateTransaction(fastify, transactionId, clientId) {
  const transaction = await fetchTransactionById(fastify, transactionId);

  if (!transaction)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró transacción con id ${transactionId}.`,
    };

  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cliente con id ${clientId}.`,
    };

  if (client.accountId !== transaction.accountId)
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.BAD_REQUEST,
      message: `El cliente ${client.id} no pertenece a la cuenta ${transaction.accountId}.`,
    };

  var oldClientBalance = null;
  if (transaction.clientId) {
    if (transaction.clientId === clientId) {
      throw {
        isCustom: true,
        statusCode: 400,
        errorType: ERROR_TYPES.DUPLICATE_ENTRY,
        message: `La transacción ya se encuentra vinculada al cliente ${clientId}.`,
      };
    }

    const oldClient = await fetchClientById(fastify, transaction.clientId);

    if (!oldClient)
      throw {
        isCustom: true,
        statusCode: 404,
        errorType: ERROR_TYPES.NOT_FOUND,
        message: `No se encontró cliente con id ${transaction.clientId}.`,
      };

    const amountWithoutCommission = transaction.amount.minus(
      transaction.commissionAmount
    );

    oldClientBalance = oldClient.balance
      .plus(amountWithoutCommission)
      .toString();
  }

  const commissionRate = client.commission.dividedBy(100);
  const commissionAmount = transaction.amount.times(commissionRate).toString();
  const amountWithoutCommission = transaction.amount.minus(commissionAmount);
  const updatedBalance = client.balance
    .minus(amountWithoutCommission)
    .toString();

  const succeeded = await putTransactionAndUpdateBalance(
    fastify,
    transactionId,
    client.id,
    updatedBalance,
    commissionAmount,
    transaction.clientId ?? null,
    oldClientBalance
  );

  if (!succeeded)
    throw {
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: `Ocurrió un error al actualizar la transacción ${transactionId}.`,
    };

  return { succeeded: succeeded };
}
