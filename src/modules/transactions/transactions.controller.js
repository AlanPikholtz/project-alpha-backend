import {
  assignTransactions,
  bulkCreateTransactions,
  createTransaction,
  getTransactions,
} from "./transactions.service.js";

import { DateTime } from "luxon";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { normalizeResponse } from "../../utils/response.js";

export async function createTransactionHandler(req, reply) {
  try {
    const { date, type, amount, currency, accountId } = req.body;

    req.log.info(`📥 Creating transaction: date ${date} - ${type}`);

    const transactionId = await createTransaction(
      req.server,
      date,
      type,
      amount,
      currency,
      accountId
    );

    req.log.info(`✅ Transaction created with ID: ${transactionId}`);

    return reply.status(201).send(transactionId);
  } catch (error) {
    req.log.error(`❌ Error creating transaction: ${error.message}`);
    throw error;
  }
}

export async function bulkCreateTransactionsHandler(req, reply) {
  try {
    const { accountId } = req.params;
    const transactions = req.body;

    req.log.info(`📥 Bulk creating ${transactions.length} transactions`);

    const transactionsCreated = await bulkCreateTransactions(
      req.server,
      transactions,
      accountId
    );

    req.log.info(`✅ ${transactionsCreated} Transactions created`);

    return reply.status(201).send();
  } catch (error) {
    req.log.error(`❌ Error bulk creating transactions: ${error.message}`);
    throw error;
  }
}

export async function getTransactionsHandler(req, reply) {
  try {
    var {
      status,
      clientId,
      accountId,
      limit = 10,
      page = 1,
      amount,
      from,
      to,
      sort = "createdAt",
      order = "desc",
    } = req.query;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    if (from && to) {
      const fromDate = DateTime.fromISO(from, { setZone: true }).toUTC();
      const toDate = DateTime.fromISO(to, { setZone: true }).toUTC();

      if (fromDate > toDate) {
        throw {
          isCustom: true,
          statusCode: 400,
          errorType: ERROR_TYPES.BAD_REQUEST,
          message: '"from" no puede ser mayor que "to"',
        };
      }
    }

    req.log.info(
      `📥 Request received: GET /transactions?status=${status}&clientId=${clientId}&accountId=${accountId}&limit=${limit}&page=${page}&amount=${amount}&from=${from}&to=${to}&sort=${sort}&order=${order}`
    );

    console.time("⏱️ GET /transactions execution time");
    const transactions = await getTransactions(
      req.server,
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

export async function assignTransactionsHandler(req, reply) {
  try {
    const { clientId } = req.params;

    const { transactionIds } = req.body;

    req.log.info(
      `📥 Assigning transactions ${transactionIds} to client ${clientId}`
    );

    await assignTransactions(req.server, transactionIds, clientId);

    req.log.info(
      `✅ Transaction assigned successfully - Client id: ${clientId}`
    );

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error assigning transactions: ${error.message}`);
    throw error;
  }
}
