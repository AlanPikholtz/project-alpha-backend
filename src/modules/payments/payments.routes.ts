import { FastifyInstance } from 'fastify';
import {
  createPaymentHandler,
  deletePaymentHandler,
  getAllPaymentsHandler,
  getPaymentHandler,
  updatePaymentHandler,
} from './payments.controller.js';

export default async function paymentRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/payments', { preValidation: [fastify.authenticate] }, getAllPaymentsHandler);
  fastify.get('/payments/:id', { preValidation: [fastify.authenticate] }, getPaymentHandler);
  fastify.post('/payments', { preValidation: [fastify.authenticate] }, createPaymentHandler);
  fastify.put('/payments/:id', { preValidation: [fastify.authenticate] }, updatePaymentHandler);
  fastify.delete('/payments/:id', { preValidation: [fastify.authenticate] }, deletePaymentHandler);
}
