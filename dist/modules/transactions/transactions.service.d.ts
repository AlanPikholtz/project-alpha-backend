import { FastifyInstance } from "fastify";
import { TransactionsResponse } from "../../types/transactions.js";
export declare function getAllTransactions(fastify: FastifyInstance, limit: number | null, offset: number, page: number): Promise<TransactionsResponse>;
export declare function getTransactionById(fastify: FastifyInstance, id: number): Promise<import("../../types/entities.js").Transaction>;
export declare function createTransaction(fastify: FastifyInstance, data: any): Promise<{
    id: number;
}>;
export declare function updateTransaction(fastify: FastifyInstance, id: number, data: any): Promise<{
    succeeded: boolean;
}>;
export declare function deleteTransactionById(fastify: FastifyInstance, id: number): Promise<{
    succeeded: boolean;
}>;
