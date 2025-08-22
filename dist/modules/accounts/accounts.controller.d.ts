import { FastifyReply, FastifyRequest } from "fastify";
export declare function getAllAccountsHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
export declare function getAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
export declare function createAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
export declare function updateAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
export declare function deleteAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
