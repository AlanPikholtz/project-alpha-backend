import {
  createTransaction,
  getClientTransactions,
} from "./transactions.service.js";

export async function createTransactionHandler(req, reply) {
  try {
    const { clientId, accountId, type, amount } = req.body;

    req.log.info(
      `📥 Creating transaction for client ${clientId}: account ${accountId} - ${type} $${amount}`
    );

    const transactionId = await createTransaction(
      req.server,
      clientId,
      accountId,
      type,
      amount
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

    return reply.send(transactions);
  } catch (error) {
    req.log.error(`❌ Error fetching transactions: ${error.message}`);
    throw error;
  }
}
