import { createPayment, deletePaymentById, getAllPayments, getPaymentById, updatePayment, } from "./payments.service.js";
export async function getAllPaymentsHandler(req, reply) {
    try {
        let { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;
        if (limit === 0) {
            limit = null;
        }
        const result = await getAllPayments(req.server, limit, offset, page);
        return reply.send(result);
    }
    catch (error) {
        throw error;
    }
}
export async function getPaymentHandler(req, reply) {
    try {
        const { id } = req.params;
        const payment = await getPaymentById(req.server, parseInt(id));
        return reply.send(payment);
    }
    catch (error) {
        throw error;
    }
}
export async function createPaymentHandler(req, reply) {
    try {
        const paymentId = await createPayment(req.server, req.body);
        return reply.status(201).send(paymentId);
    }
    catch (error) {
        throw error;
    }
}
export async function updatePaymentHandler(req, reply) {
    try {
        const { id } = req.params;
        await updatePayment(req.server, parseInt(id), req.body);
        return reply.status(204).send();
    }
    catch (error) {
        throw error;
    }
}
export async function deletePaymentHandler(req, reply) {
    try {
        const { id } = req.params;
        await deletePaymentById(req.server, parseInt(id));
        return reply.status(204).send();
    }
    catch (error) {
        throw error;
    }
}
