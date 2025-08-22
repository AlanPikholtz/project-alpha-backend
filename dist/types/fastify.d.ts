import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
declare module 'fastify' {
    interface FastifyInstance {
        config: {
            PORT: string;
            HOST: string;
            DB_HOST: string;
            DB_USER: string;
            DB_PASS: string;
            DB_NAME: string;
            DB_PORT: string;
            JWT_SECRET: string;
        };
        mysql: any;
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}
declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: {
            id: number;
            username?: string;
            iat?: number;
            exp?: number;
        };
        user: {
            id: number;
            username?: string;
            iat?: number;
            exp?: number;
        };
    }
}
export interface AuthenticatedRequest extends FastifyRequest {
    user: {
        id: number;
        username: string;
    };
}
export type RouteHandler<T = any> = (request: FastifyRequest<{
    Body: T;
}>, reply: FastifyReply) => Promise<any>;
export type AuthenticatedRouteHandler<T = any> = (request: AuthenticatedRequest & FastifyRequest<{
    Body: T;
}>, reply: FastifyReply) => Promise<any>;
export type FastifyTypebox = FastifyInstance<any, any, any, any, TypeBoxTypeProvider>;
