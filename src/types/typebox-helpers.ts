import { TSchema } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

// Helper types para TypeBox routes
export interface TypeBoxRouteOptions<
  TBody extends TSchema = never,
  TQuerystring extends TSchema = never,
  TParams extends TSchema = never,
  THeaders extends TSchema = never,
> extends Omit<RouteOptions, 'schema'> {
  schema?: {
    body?: TBody;
    querystring?: TQuerystring;
    params?: TParams;
    headers?: THeaders;
    response?: Record<string, TSchema>;
  };
}

// Handler tipado para TypeBox
export type TypeBoxHandler<
  TBody extends TSchema = never,
  TQuerystring extends TSchema = never,
  TParams extends TSchema = never,
  THeaders extends TSchema = never,
> = (
  request: FastifyRequest<{
    Body: TBody extends TSchema ? TBody['static'] : unknown;
    Querystring: TQuerystring extends TSchema ? TQuerystring['static'] : unknown;
    Params: TParams extends TSchema ? TParams['static'] : unknown;
    Headers: THeaders extends TSchema ? THeaders['static'] : unknown;
  }>,
  reply: FastifyReply,
) => Promise<any>;

// Helper para crear rutas con tipos automáticos
export function createTypedRoute<
  TBody extends TSchema = never,
  TQuerystring extends TSchema = never,
  TParams extends TSchema = never,
  THeaders extends TSchema = never,
>(
  options: TypeBoxRouteOptions<TBody, TQuerystring, TParams, THeaders>,
  handler: TypeBoxHandler<TBody, TQuerystring, TParams, THeaders>,
) {
  return { ...options, handler };
}
