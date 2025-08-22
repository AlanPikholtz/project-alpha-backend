import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { deletePayment, fetchCountPayments, fetchPaymentById, fetchPayments, insertPayment, putPayment, } from "./payments.repository.js";
export async function getAllPayments(fastify, limit, offset, page) {
    const payments = await fetchPayments(fastify, limit, offset);
    const totalPayments = await fetchCountPayments(fastify);
    const totalPages = !limit ? 1 : Math.ceil(totalPayments / limit);
    return {
        data: payments,
        total: totalPayments,
        page: page,
        pages: totalPages,
        limit: limit ?? 0,
    };
}
export async function getPaymentById(fastify, id) {
    const payment = await fetchPaymentById(fastify, id);
    if (!payment) {
        const error = {
            name: "CustomError",
            message: `No se encontró pago con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    return payment;
}
export async function createPayment(fastify, data) {
    const result = await insertPayment(fastify, data);
    return { id: result.insertId };
}
export async function updatePayment(fastify, id, data) {
    const payment = await fetchPaymentById(fastify, id);
    if (!payment) {
        const error = {
            name: "CustomError",
            message: `No se encontró pago con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await putPayment(fastify, id, data);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al actualizar el pago ${id}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded };
}
export async function deletePaymentById(fastify, id) {
    const payment = await fetchPaymentById(fastify, id);
    if (!payment) {
        const error = {
            name: "CustomError",
            message: `No se encontró pago con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await deletePayment(fastify, id);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al eliminar el pago ${id}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded };
}
