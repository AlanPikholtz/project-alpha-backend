import {
  fetchTransactionsByClientId,
  insertTransaction,
} from "./transactions.repository.js";

import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchClientById } from "../clients/clients.repository.js";

export async function createTransaction(fastify, clientId, type, amount) {
  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No client found with id ${clientId}.`,
    };

  const result = await insertTransaction(fastify, clientId, type, amount);
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
    type: t.type,
    amount: t.amount,
    createdAt: t.created_at,
  }));
}
