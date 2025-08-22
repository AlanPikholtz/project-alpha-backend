import { FastifyInstance } from "fastify";
import { Account } from "../../types/entities.js";
interface DatabaseResult {
    insertId: number;
    affectedRows: number;
}
export declare function insertAccount(fastify: FastifyInstance, name: string): Promise<DatabaseResult>;
export declare function fetchAccounts(fastify: FastifyInstance, limit: number | null, offset: number): Promise<Account[]>;
export declare function fetchCountAccounts(fastify: FastifyInstance): Promise<number>;
export declare function fetchAccountById(fastify: FastifyInstance, id: number): Promise<Account | undefined>;
export declare function putAccount(fastify: FastifyInstance, id: number, name: string): Promise<boolean>;
export declare function deleteAccount(fastify: FastifyInstance, id: number): Promise<boolean>;
export {};
