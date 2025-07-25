import {
  bulkInsertTransactions,
  deleteTransactionsByIds,
  fetchCountTransactions,
  fetchTransactionById,
  fetchTransactions,
  fetchTransactionsByAmountAndDate,
  fetchTransactionsByIds,
  insertTransaction,
  putTransactionsAndUpdateBalance,
  putUnassignedTransactionAndUpdateBalance,
} from "./transactions.repository.js";

import { fetchAccountById } from "../accounts/accounts.repository.js";

import Decimal from "decimal.js";
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

  const existingTransactions = await fetchTransactionsByAmountAndDate(
    fastify,
    parsedTransactions
  );

  if (existingTransactions.length > 0) {
    const duplicatedDateAmounts = existingTransactions.map((transaction) => {
      return {
        ...transaction,
        date: DateTime.fromSQL(transaction.date, { zone: "utc" }).toISO(),
      };
    });

    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.DUPLICATE_ENTRY,
      message: [duplicatedDateAmounts],
    };
  }

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
  accountId,
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

  if (accountId) {
    const account = await fetchAccountById(fastify, accountId);

    if (!account)
      throw {
        isCustom: true,
        statusCode: 404,
        errorType: ERROR_TYPES.NOT_FOUND,
        message: `No se encontró cuenta con id ${accountId}.`,
      };
  }

  const transactions = await fetchTransactions(
    fastify,
    status,
    clientId,
    accountId,
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

export async function assignTransactions(fastify, transactionIds, clientId) {
  const transactions = await fetchTransactionsByIds(fastify, transactionIds);

  if (transactions.length !== transactionIds.length)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontraron todas las transacciones.`,
    };

  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cliente con id ${clientId}.`,
    };

  const accountIds = [...new Set(transactions.map((t) => t.accountId))];
  if (accountIds.length > 1)
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.BAD_REQUEST,
      message: `No se pueden asignar transacciones pertenecientes a diferentes cuentas.`,
    };

  if (accountIds[0] !== client.accountId)
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.BAD_REQUEST,
      message: `El cliente ${client.id} no pertenece a la cuenta ${accountIds[0]}.`,
    };

  const isAnyAlreadyAssignedToClient = transactions.some(
    (t) => t.clientId === clientId
  );

  if (isAnyAlreadyAssignedToClient) {
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.DUPLICATE_ENTRY,
      message: `Una o más transacciones ya se encuentran vinculadas al cliente ${clientId}.`,
    };
  }

  const amountByPreviousClient = {};

  const clientCommissionRate = client.commission.dividedBy(100);

  for (const transaction of transactions) {
    if (transaction.clientId) {
      const oldClient = await fetchClientById(
        fastify,
        transaction.clientId,
        true
      );

      if (!oldClient) {
        throw {
          isCustom: true,
          statusCode: 404,
          errorType: ERROR_TYPES.NOT_FOUND,
          message: `No se encontró cliente con id ${transaction.clientId}.`,
        };
      }

      if (!amountByPreviousClient[transaction.clientId]) {
        amountByPreviousClient[transaction.clientId] = oldClient.balance;
      }

      const amountWithoutCommission = transaction.amount.minus(
        transaction.commissionAmount
      );

      amountByPreviousClient[transaction.clientId] = amountByPreviousClient[
        transaction.clientId
      ].minus(amountWithoutCommission);
    }

    const transactionCommissionAmount = transaction.amount
      .times(clientCommissionRate)
      .toString();
    const transactionAmountWithoutCommission = transaction.amount.minus(
      transactionCommissionAmount
    );
    client.balance = client.balance.plus(transactionAmountWithoutCommission);

    transaction.commissionAmount = transactionCommissionAmount;
  }

  const balance = new Decimal(client.balance).toString();

  const succeeded = await putTransactionsAndUpdateBalance(
    fastify,
    transactions,
    client.id,
    balance,
    amountByPreviousClient
  );

  if (!succeeded)
    throw {
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: `Ocurrió un error al actualizar las transacciones.`,
    };

  return { succeeded: succeeded };
}

export async function unassignTransaction(fastify, transactionId) {
  const transaction = await fetchTransactionById(fastify, transactionId);

  if (!transaction)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró transacción con id ${transactionId}.`,
    };

  if (!transaction.clientId)
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.BAD_REQUEST,
      message: `La transacción ${transactionId} no está asignada a ningún cliente.`,
    };

  const client = await fetchClientById(fastify, transaction.clientId, true);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cliente con id ${transaction.clientId}.`,
    };

  const amountWithoutCommission = transaction.amount.minus(
    transaction.commissionAmount
  );

  client.balance = client.balance.minus(amountWithoutCommission);

  const balance = new Decimal(client.balance).toString();

  const succeeded = await putUnassignedTransactionAndUpdateBalance(
    fastify,
    transaction,
    client.id,
    balance
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

export async function bulkDeleteTransactions(fastify, transactionIds) {
  const transactions = await fetchTransactionsByIds(fastify, transactionIds);

  if (transactions.length !== transactionIds.length)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontraron todas las transacciones.`,
    };

  const isAnyAlreadyAssignedToClient = transactions.some((t) => t.clientId);

  if (isAnyAlreadyAssignedToClient) {
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.DUPLICATE_ENTRY,
      message: `Una o más transacciones se encuentran vinculadas a un cliente.`,
    };
  }

  const succeeded = await deleteTransactionsByIds(fastify, transactionIds);

  if (!succeeded)
    throw {
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: `Ocurrió un error al eliminar las transacciones.`,
    };

  return { succeeded: succeeded };
}
