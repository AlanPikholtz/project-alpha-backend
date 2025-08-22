import { createMetric, deleteMetricById, getAllMetrics, getMetricById, updateMetric, } from "./metrics.service.js";
export async function getAllMetricsHandler(req, reply) {
    try {
        let { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;
        if (limit === 0) {
            limit = null;
        }
        const result = await getAllMetrics(req.server, limit, offset, page);
        return reply.send(result);
    }
    catch (error) {
        throw error;
    }
}
export async function getMetricHandler(req, reply) {
    try {
        const { id } = req.params;
        const metric = await getMetricById(req.server, parseInt(id));
        return reply.send(metric);
    }
    catch (error) {
        throw error;
    }
}
export async function createMetricHandler(req, reply) {
    try {
        const metricId = await createMetric(req.server, req.body);
        return reply.status(201).send(metricId);
    }
    catch (error) {
        throw error;
    }
}
export async function updateMetricHandler(req, reply) {
    try {
        const { id } = req.params;
        await updateMetric(req.server, parseInt(id), req.body);
        return reply.status(204).send();
    }
    catch (error) {
        throw error;
    }
}
export async function deleteMetricHandler(req, reply) {
    try {
        const { id } = req.params;
        await deleteMetricById(req.server, parseInt(id));
        return reply.status(204).send();
    }
    catch (error) {
        throw error;
    }
}
