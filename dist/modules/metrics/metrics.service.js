import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { deleteMetric, fetchCountMetrics, fetchMetricById, fetchMetrics, insertMetric, putMetric, } from "./metrics.repository.js";
export async function getAllMetrics(fastify, limit, offset, page) {
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
export async function getMetricById(fastify, id) {
    const metric = await fetchMetricById(fastify, id);
    if (!metric) {
        const error = {
            name: "CustomError",
            message: `No se encontró métrica con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    return metric;
}
export async function createMetric(fastify, data) {
    const result = await insertMetric(fastify, data);
    return { id: result.insertId };
}
export async function updateMetric(fastify, id, data) {
    const metric = await fetchMetricById(fastify, id);
    if (!metric) {
        const error = {
            name: "CustomError",
            message: `No se encontró métrica con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await putMetric(fastify, id, data);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al actualizar la métrica ${id}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded };
}
export async function deleteMetricById(fastify, id) {
    const metric = await fetchMetricById(fastify, id);
    if (!metric) {
        const error = {
            name: "CustomError",
            message: `No se encontró métrica con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await deleteMetric(fastify, id);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al eliminar la métrica ${id}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded };
}
