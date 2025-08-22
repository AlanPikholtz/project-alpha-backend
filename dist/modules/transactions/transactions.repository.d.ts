import { FastifyInstance } from "fastify";
import { Transaction } from "../../types/entities.js";
interface DatabaseResult {
    insertId: number;
    affectedRows: number;
}
export declare function insertTransaction(fastify: FastifyInstance, data: any): Promise<DatabaseResult>;
export declare function fetchTransactions(fastify: FastifyInstance, limit: number | null, offset: number): Promise<Transaction[]>;
export declare function fetchTransactionById(fastify: FastifyInstance, id: number): Promise<Transaction | undefined>;
export declare function fetchCountTransactions(fastify: FastifyInstance): Promise<number>;
export declare function putTransaction(fastify: FastifyInstance, id: number, data: any): Promise<boolean>;
export declare function deleteTransaction(fastify: FastifyInstance, id: number): Promise<boolean>;
export {};
