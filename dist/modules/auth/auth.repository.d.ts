import { FastifyInstance } from "fastify";
import { User } from "../../types/entities.js";
interface DatabaseResult {
    insertId: number;
    affectedRows: number;
}
export declare function fetchUserByUsername(fastify: FastifyInstance, username: string): Promise<User | undefined>;
export declare function fetchUserById(fastify: FastifyInstance, id: number): Promise<User | undefined>;
export declare function insertUser(fastify: FastifyInstance, username: string, password: string): Promise<DatabaseResult>;
export {};
