import { FastifyInstance } from 'fastify';
import {
  createMetricHandler,
  deleteMetricHandler,
  getAllMetricsHandler,
  getMetricHandler,
  updateMetricHandler,
} from './metrics.controller.js';

export default async function metricRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/metrics', { preValidation: [fastify.authenticate] }, getAllMetricsHandler);
  fastify.get('/metrics/:id', { preValidation: [fastify.authenticate] }, getMetricHandler);
  fastify.post('/metrics', { preValidation: [fastify.authenticate] }, createMetricHandler);
  fastify.put('/metrics/:id', { preValidation: [fastify.authenticate] }, updateMetricHandler);
  fastify.delete('/metrics/:id', { preValidation: [fastify.authenticate] }, deleteMetricHandler);
}
