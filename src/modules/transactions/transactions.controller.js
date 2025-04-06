import {
  createTransaction,
  getClientTransactions,
  getTransactions,
  updateTransaction,
} from "./transactions.service.js";

import { normalizeResponse } from "../../utils/response.js";

export async function createTransactionHandler(req, reply) {
  try {
    const { date, type, amount, currency } = req.body;

    req.log.info(`📥 Creating transaction: date ${date} - ${type}`);

    const transactionId = await createTransaction(
      req.server,
      date,
      type,
      amount,
      currency
    );

    req.log.info(`✅ Transaction created with ID: ${transactionId}`);

    return reply.status(201).send(transactionId);
  } catch (error) {
    req.log.error(`❌ Error creating transaction: ${error.message}`);
    throw error;
  }
}

export async function getClientTransactionsHandler(req, reply) {
  try {
    const { clientId } = req.params;

    req.log.info(`📥 Fetching transactions for client ${clientId}`);

    console.time(`⏱️ GET /transactions/client/${clientId} execution time`);
    const transactions = await getClientTransactions(req.server, clientId);
    console.timeEnd(`⏱️ GET /transactions/client/${clientId} execution time`);

    req.log.info(`✅ Retrieved ${transactions.length} transactions`);

    const normalizedTransactions = normalizeResponse(transactions);
    return reply.send(normalizedTransactions);
  } catch (error) {
    req.log.error(`❌ Error fetching transactions: ${error.message}`);
    throw error;
  }
}

export async function getTransactionsHandler(req, reply) {
  try {
    var { status, limit = 10, page = 1, amount } = req.query;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(
      `📥 Request received: GET /transactions?status=${status}&limit=${limit}&page=${page}&amount=${amount}`
    );

    console.time("⏱️ GET /transactions execution time");
    const transactions = await getTransactions(
      req.server,
      status,
      limit,
      offset,
      page,
      amount
    );
    console.timeEnd("⏱️ GET /transactions execution time");

    req.log.info(
      `✅ Transactions retrieved: ${transactions.length} records found`
    );
    const normalizedTransactions = normalizeResponse(transactions);
    return reply.send(normalizedTransactions);
  } catch (error) {
    req.log.error(`❌ Error retrieving transactions: ${error.message}`);
    throw error;
  }
}

export async function updateTransactionHandler(req, reply) {
  try {
    const { id } = req.params;

    const { clientId } = req.body;

    req.log.info(`📥 Updating transaction ${id}`);

    await updateTransaction(req.server, id, clientId);

    req.log.info(`✅ Transaction updated successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error updating transaction: ${error.message}`);
    throw error;
  }
}
