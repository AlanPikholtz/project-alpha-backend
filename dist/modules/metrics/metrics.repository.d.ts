import { FastifyInstance } from "fastify";
import { Metric } from "../../types/entities.js";
interface DatabaseResult {
    insertId: number;
    affectedRows: number;
}
export declare function insertMetric(fastify: FastifyInstance, data: any): Promise<DatabaseResult>;
export declare function fetchMetrics(fastify: FastifyInstance, limit: number | null, offset: number): Promise<Metric[]>;
export declare function fetchMetricById(fastify: FastifyInstance, id: number): Promise<Metric | undefined>;
export declare function fetchCountMetrics(fastify: FastifyInstance): Promise<number>;
export declare function putMetric(fastify: FastifyInstance, id: number, data: any): Promise<boolean>;
export declare function deleteMetric(fastify: FastifyInstance, id: number): Promise<boolean>;
export {};
