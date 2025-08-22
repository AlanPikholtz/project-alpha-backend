import { FastifyInstance } from "fastify";
import { ClientsResponse } from "../../types/clients.js";
export declare function getAllClients(fastify: FastifyInstance, limit: number | null, offset: number, page: number, accountId?: number): Promise<ClientsResponse>;
export declare function getClientById(fastify: FastifyInstance, id: number): Promise<import("../../types/entities.js").Client>;
export declare function createClient(fastify: FastifyInstance, firstName: string, lastName: string | null, code: string, balance: string, commission: string | null, notes: string | null, accountId: number): Promise<{
    id: number;
}>;
export declare function updateClient(fastify: FastifyInstance, clientId: number, firstName: string, lastName: string | null, commission: string, notes: string | null, accountId: number): Promise<{
    succeeded: boolean;
}>;
export declare function updateClientBalance(fastify: FastifyInstance, clientId: number, balance: string): Promise<{
    succeeded: boolean;
}>;
export declare function deleteClientById(fastify: FastifyInstance, clientId: number): Promise<{
    succeeded: boolean;
}>;
export declare function getClientOperations(fastify: FastifyInstance, clientId: number, limit: number | null, offset: number, from?: string, to?: string, sort?: string, order?: string, page?: number, type?: string): Promise<ClientsResponse>;
