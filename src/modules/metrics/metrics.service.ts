import { FastifyInstance } from 'fastify';
import { ERROR_TYPES } from '../../constants/errorTypes.js';
import { CustomError } from '../../types/errors.js';
import { MetricsResponse } from '../../types/metrics.js';
import {
  deleteMetric,
  fetchCountMetrics,
  fetchMetricById,
  fetchMetrics,
  insertMetric,
  putMetric,
} from './metrics.repository.js';

export async function getAllMetrics(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
  page: number,
): Promise<MetricsResponse> {
  const metrics = await fetchMetrics(fastify, limit, offset);
  const totalMetrics = await fetchCountMetrics(fastify);
  const totalPages = !limit ? 1 : Math.ceil(totalMetrics / limit);

  return {
    data: metrics,
    total: totalMetrics,
    page: page,
    pages: totalPages,
    limit: limit ?? 0,
  };
}

export async function getMetricById(fastify: FastifyInstance, id: number) {
  const metric = await fetchMetricById(fastify, id);

  if (!metric) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró métrica con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  return metric;
}

export async function createMetric(fastify: FastifyInstance, data: any): Promise<{ id: number }> {
  const result = await insertMetric(fastify, data);
  return { id: result.insertId };
}

export async function updateMetric(fastify: FastifyInstance, id: number, data: any): Promise<{ succeeded: boolean }> {
  const metric = await fetchMetricById(fastify, id);

  if (!metric) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró métrica con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await putMetric(fastify, id, data);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al actualizar la métrica ${id}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded };
}

export async function deleteMetricById(fastify: FastifyInstance, id: number): Promise<{ succeeded: boolean }> {
  const metric = await fetchMetricById(fastify, id);

  if (!metric) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró métrica con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await deleteMetric(fastify, id);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al eliminar la métrica ${id}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded };
}
