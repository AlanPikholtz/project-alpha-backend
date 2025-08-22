import { FastifyInstance } from "fastify";
import { Client } from "../../types/entities.js";
interface DatabaseResult {
    insertId: number;
    affectedRows: number;
}
export declare function insertClient(fastify: FastifyInstance, firstName: string, lastName: string | null, code: string, balance: string, commission: string | null, notes: string | null, accountId: number): Promise<DatabaseResult>;
export declare function fetchClients(fastify: FastifyInstance, limit: number | null, offset: number, accountId?: number): Promise<Client[]>;
export declare function fetchCountClients(fastify: FastifyInstance, accountId?: number): Promise<number>;
export declare function fetchClientById(fastify: FastifyInstance, id: number, withDeleted?: boolean): Promise<Client | undefined>;
export declare function fetchClientByCode(fastify: FastifyInstance, code: string): Promise<Client | undefined>;
export declare function putClient(fastify: FastifyInstance, clientId: number, firstName: string, lastName: string | null, commission: string, notes: string | null, accountId: number): Promise<boolean>;
export declare function putClientBalance(fastify: FastifyInstance, clientId: number, balance: string): Promise<boolean>;
export declare function deleteClient(fastify: FastifyInstance, clientId: number): Promise<boolean>;
export declare function fetchClientOperations(fastify: FastifyInstance, clientId: number, limit: number | null, offset: number, from?: string, to?: string, sort?: string, order?: string, type?: string): Promise<any[]>;
export declare function fetchCountOperations(fastify: FastifyInstance, clientId: number, from?: string, to?: string, type?: string): Promise<number>;
export {};
