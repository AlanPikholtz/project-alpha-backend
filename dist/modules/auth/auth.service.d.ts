import { FastifyInstance } from "fastify";
import { AuthTokensResponse, RegisterResponse } from "../../types/index.js";
export declare function registerUser(fastify: FastifyInstance, username: string, password: string): Promise<RegisterResponse>;
export declare function loginUser(fastify: FastifyInstance, username: string, password: string): Promise<AuthTokensResponse>;
export declare function refreshTokens(fastify: FastifyInstance, token: string): Promise<AuthTokensResponse>;
