import { createTransaction, deleteTransactionById, getAllTransactions, getTransactionById, updateTransaction, } from "./transactions.service.js";
export async function getAllTransactionsHandler(req, reply) {
    try {
        let { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;
        if (limit === 0) {
            limit = null;
        }
        req.log.info(`📥 Request received: GET /transactions?limit=${limit}&page=${page}`);
        const result = await getAllTransactions(req.server, limit, offset, page);
        req.log.info(`✅ Transactions retrieved: ${result.total} records found`);
        return reply.send(result);
    }
    catch (error) {
        req.log.error(`❌ Error retrieving transactions: ${error.message}`);
        throw error;
    }
}
export async function getTransactionHandler(req, reply) {
    try {
        const { id } = req.params;
        req.log.info(`📥 Request received: GET /transactions/${id}`);
        const transaction = await getTransactionById(req.server, parseInt(id));
        req.log.info(`✅ Transaction found`);
        return reply.send(transaction);
    }
    catch (error) {
        req.log.error(`❌ Error retrieving transaction: ${error.message}`);
        throw error;
    }
}
export async function createTransactionHandler(req, reply) {
    try {
        req.log.info(`📥 Creating transaction`);
        const transactionId = await createTransaction(req.server, req.body);
        req.log.info(`✅ Transaction created with ID: ${transactionId.id}`);
        return reply.status(201).send(transactionId);
    }
    catch (error) {
        req.log.error(`❌ Error creating transaction: ${error.message}`);
        throw error;
    }
}
export async function updateTransactionHandler(req, reply) {
    try {
        const { id } = req.params;
        req.log.info(`📥 Updating transaction ${id}`);
        await updateTransaction(req.server, parseInt(id), req.body);
        req.log.info(`✅ Transaction updated successfully - Transaction id: ${id}`);
        return reply.status(204).send();
    }
    catch (error) {
        req.log.error(`❌ Error updating transaction: ${error.message}`);
        throw error;
    }
}
export async function deleteTransactionHandler(req, reply) {
    try {
        const { id } = req.params;
        req.log.info(`📥 Deleting transaction ${id}`);
        await deleteTransactionById(req.server, parseInt(id));
        req.log.info(`✅ Transaction deleted successfully - Transaction id: ${id}`);
        return reply.status(204).send();
    }
    catch (error) {
        req.log.error(`❌ Error deleting transaction: ${error.message}`);
        throw error;
    }
}
