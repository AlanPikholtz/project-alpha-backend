import { FastifyInstance } from 'fastify';
import {
  createClientHandler,
  deleteClientHandler,
  getAllClientsHandler,
  getClientHandler,
  getClientOperationsHandler,
  updateClientBalanceHandler,
  updateClientHandler,
} from './clients.controller.js';

import {
  createClientSchema,
  deleteClientSchema,
  getAllClientsSchema,
  getClientOperationsSchema,
  getClientSchema,
  updateClientBalanceSchema,
  updateClientSchema,
} from './clients.schema.js';

export default async function clientRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/clients', { schema: getAllClientsSchema, preValidation: [fastify.authenticate] }, getAllClientsHandler);

  fastify.get('/clients/:id', { schema: getClientSchema, preValidation: [fastify.authenticate] }, getClientHandler);

  fastify.post('/clients', { schema: createClientSchema, preValidation: [fastify.authenticate] }, createClientHandler);

  fastify.put(
    '/clients/:id',
    { schema: updateClientSchema, preValidation: [fastify.authenticate] },
    updateClientHandler,
  );

  fastify.put(
    '/clients/:id/balance',
    { schema: updateClientBalanceSchema, preValidation: [fastify.authenticate] },
    updateClientBalanceHandler,
  );

  fastify.delete(
    '/clients/:id',
    { schema: deleteClientSchema, preValidation: [fastify.authenticate] },
    deleteClientHandler,
  );

  fastify.get(
    '/clients/:id/operations',
    { schema: getClientOperationsSchema, preValidation: [fastify.authenticate] },
    getClientOperationsHandler,
  );
}
