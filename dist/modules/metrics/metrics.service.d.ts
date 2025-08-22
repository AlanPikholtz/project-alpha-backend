import { FastifyInstance } from "fastify";
import { MetricsResponse } from "../../types/metrics.js";
export declare function getAllMetrics(fastify: FastifyInstance, limit: number | null, offset: number, page: number): Promise<MetricsResponse>;
export declare function getMetricById(fastify: FastifyInstance, id: number): Promise<import("../../types/entities.js").Metric>;
export declare function createMetric(fastify: FastifyInstance, data: any): Promise<{
    id: number;
}>;
export declare function updateMetric(fastify: FastifyInstance, id: number, data: any): Promise<{
    succeeded: boolean;
}>;
export declare function deleteMetricById(fastify: FastifyInstance, id: number): Promise<{
    succeeded: boolean;
}>;
