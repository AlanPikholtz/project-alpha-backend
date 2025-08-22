import { FastifyInstance } from "fastify";
import { Payment } from "../../types/entities.js";
interface DatabaseResult {
    insertId: number;
    affectedRows: number;
}
export declare function insertPayment(fastify: FastifyInstance, data: any): Promise<DatabaseResult>;
export declare function fetchPayments(fastify: FastifyInstance, limit: number | null, offset: number): Promise<Payment[]>;
export declare function fetchPaymentById(fastify: FastifyInstance, id: number): Promise<Payment | undefined>;
export declare function fetchCountPayments(fastify: FastifyInstance): Promise<number>;
export declare function putPayment(fastify: FastifyInstance, id: number, data: any): Promise<boolean>;
export declare function deletePayment(fastify: FastifyInstance, id: number): Promise<boolean>;
export {};
