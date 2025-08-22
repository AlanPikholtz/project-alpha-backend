import { FastifyReply, FastifyRequest } from 'fastify';
import { createPayment, deletePaymentById, getAllPayments, getPaymentById, updatePayment } from './payments.service.js';

export async function getAllPaymentsHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    let { limit = 10, page = 1 } = req.query as any;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    const result = await getAllPayments(req.server, limit, offset, page);
    return reply.send(result);
  } catch (error: any) {
    throw error;
  }
}

export async function getPaymentHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    const payment = await getPaymentById(req.server, parseInt(id));
    return reply.send(payment);
  } catch (error: any) {
    throw error;
  }
}

export async function createPaymentHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const paymentId = await createPayment(req.server, req.body);
    return reply.status(201).send(paymentId);
  } catch (error: any) {
    throw error;
  }
}

export async function updatePaymentHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    await updatePayment(req.server, parseInt(id), req.body);
    return reply.status(204).send();
  } catch (error: any) {
    throw error;
  }
}

export async function deletePaymentHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    await deletePaymentById(req.server, parseInt(id));
    return reply.status(204).send();
  } catch (error: any) {
    throw error;
  }
}
