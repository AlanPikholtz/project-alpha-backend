import {
  fetchTransactionsByClientId,
  insertTransaction,
} from "./transactions.repository.js";

import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchAccountById } from "../accounts/accounts.repository.js";
import { fetchClientById } from "../clients/clients.repository.js";

export async function createTransaction(
  fastify,
  clientId,
  accountId,
  type,
  amount
) {
  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No client found with id ${clientId}.`,
    };

  const account = await fetchAccountById(fastify, accountId);
  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No account found with id ${accountId}.`,
    };

  const result = await insertTransaction(
    fastify,
    clientId,
    accountId,
    type,
    amount
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
  return transactions.map((t) => ({
    id: t.id,
    clientId: t.client_id,
    accountId: t.account_id,
    type: t.type,
    amount: t.amount,
    createdAt: t.created_at,
  }));
}
