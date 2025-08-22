import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { CustomError } from "../types/errors.js";
interface ValidationError extends Error {
    validation: Array<{
        message?: string;
    }>;
    statusCode?: number;
}
export default function errorHandler(error: FastifyError | ValidationError | CustomError | Error, req: FastifyRequest, reply: FastifyReply): FastifyReply;
export {};
