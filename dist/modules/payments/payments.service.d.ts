import { FastifyInstance } from "fastify";
import { PaymentsResponse } from "../../types/payments.js";
export declare function getAllPayments(fastify: FastifyInstance, limit: number | null, offset: number, page: number): Promise<PaymentsResponse>;
export declare function getPaymentById(fastify: FastifyInstance, id: number): Promise<import("../../types/entities.js").Payment>;
export declare function createPayment(fastify: FastifyInstance, data: any): Promise<{
    id: number;
}>;
export declare function updatePayment(fastify: FastifyInstance, id: number, data: any): Promise<{
    succeeded: boolean;
}>;
export declare function deletePaymentById(fastify: FastifyInstance, id: number): Promise<{
    succeeded: boolean;
}>;
