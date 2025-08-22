import { FastifyReply, FastifyRequest } from 'fastify';
import { createMetric, deleteMetricById, getAllMetrics, getMetricById, updateMetric } from './metrics.service.js';

export async function getAllMetricsHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    let { limit = 10, page = 1 } = req.query as any;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    const result = await getAllMetrics(req.server, limit, offset, page);
    return reply.send(result);
  } catch (error: any) {
    throw error;
  }
}

export async function getMetricHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    const metric = await getMetricById(req.server, parseInt(id));
    return reply.send(metric);
  } catch (error: any) {
    throw error;
  }
}

export async function createMetricHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const metricId = await createMetric(req.server, req.body);
    return reply.status(201).send(metricId);
  } catch (error: any) {
    throw error;
  }
}

export async function updateMetricHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    await updateMetric(req.server, parseInt(id), req.body);
    return reply.status(204).send();
  } catch (error: any) {
    throw error;
  }
}

export async function deleteMetricHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    await deleteMetricById(req.server, parseInt(id));
    return reply.status(204).send();
  } catch (error: any) {
    throw error;
  }
}
