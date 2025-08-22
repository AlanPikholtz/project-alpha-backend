import { FastifyInstance } from "fastify";
import { AccountsResponse } from "../../types/accounts.js";
export declare function getAllAccounts(fastify: FastifyInstance, limit: number | null, offset: number, page: number): Promise<AccountsResponse>;
export declare function getAccountById(fastify: FastifyInstance, id: number): Promise<import("../../types/entities.js").Account>;
export declare function createAccount(fastify: FastifyInstance, name: string): Promise<{
    id: number;
}>;
export declare function updateAccount(fastify: FastifyInstance, accountId: number, name: string): Promise<{
    succeeded: boolean;
}>;
export declare function deleteAccountById(fastify: FastifyInstance, accountId: number): Promise<{
    succeeded: boolean;
}>;
