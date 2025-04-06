import {
  fetchTransactionById,
  fetchTransactions,
  fetchTransactionsByClientId,
  insertTransaction,
  putTransactionAndUpdateBalance,
} from "./transactions.repository.js";

import { DateTime } from "luxon";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchClientById } from "../clients/clients.repository.js";

export async function createTransaction(fastify, date, type, amount, currency) {
  const formatedTransactonDate = DateTime.fromISO(date, { setZone: true })
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");

  const result = await insertTransaction(
    fastify,
    formatedTransactonDate,
    type,
    amount,
    currency
  );
  return { id: result.insertId };
}

export async function getClientTransactions(fastify, clientId) {
  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No client found with id ${clientId}.`,
    };

  const transactions = await fetchTransactionsByClientId(fastify, clientId);
  return transactions;
}

export async function getTransactions(fastify, status, limit, offset) {
  const transactions = await fetchTransactions(fastify, status, limit, offset);
  return transactions;
}

export async function updateTransaction(fastify, transactionId, clientId) {
  const transaction = await fetchTransactionById(fastify, transactionId);

  if (!transaction)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No transaction found with id ${transactionId}.`,
    };

  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No client found with id ${clientId}.`,
    };

  var oldClientBalance = null;
  if (transaction.clientId) {
    if (transaction.clientId === clientId) {
      throw {
        isCustom: true,
        statusCode: 400,
        errorType: ERROR_TYPES.DUPLICATE_ENTRY,
        message: `Transaction already linked to client ${clientId}.`,
      };
    }

    oldClientBalance = transaction.clientBalance
      .plus(transaction.amount)
      .toString();
  }

  const updatedBalance = client.balance.minus(transaction.amount).toString();

  const commissionRate = client.commission.dividedBy(100);
  const commissionAmount = transaction.amount.times(commissionRate).toString();

  const succeeded = await putTransactionAndUpdateBalance(
    fastify,
    transactionId,
    client.id,
    client.accountId,
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
      message: `An error occurred while updating transaction ${transactionId}.`,
    };

  return { succeeded: succeeded };
}
