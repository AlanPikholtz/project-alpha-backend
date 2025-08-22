import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { deleteTransaction, fetchCountTransactions, fetchTransactionById, fetchTransactions, insertTransaction, putTransaction, } from "./transactions.repository.js";
export async function getAllTransactions(fastify, limit, offset, page) {
    const transactions = await fetchTransactions(fastify, limit, offset);
    const totalTransactions = await fetchCountTransactions(fastify);
    const totalPages = !limit ? 1 : Math.ceil(totalTransactions / limit);
    return {
        data: transactions,
        total: totalTransactions,
        page: page,
        pages: totalPages,
        limit: limit ?? 0,
    };
}
export async function getTransactionById(fastify, id) {
    const transaction = await fetchTransactionById(fastify, id);
    if (!transaction) {
        const error = {
            name: "CustomError",
            message: `No se encontró transacción con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    return transaction;
}
export async function createTransaction(fastify, data) {
    const result = await insertTransaction(fastify, data);
    return { id: result.insertId };
}
export async function updateTransaction(fastify, id, data) {
    const transaction = await fetchTransactionById(fastify, id);
    if (!transaction) {
        const error = {
            name: "CustomError",
            message: `No se encontró transacción con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await putTransaction(fastify, id, data);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al actualizar la transacción ${id}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded };
}
export async function deleteTransactionById(fastify, id) {
    const transaction = await fetchTransactionById(fastify, id);
    if (!transaction) {
        const error = {
            name: "CustomError",
            message: `No se encontró transacción con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await deleteTransaction(fastify, id);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al eliminar la transacción ${id}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded };
}
