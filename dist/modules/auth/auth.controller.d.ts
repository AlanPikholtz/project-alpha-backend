import { FastifyReply, FastifyRequest } from "fastify";
export declare function registerHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
export declare function loginHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
export declare function refreshHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
