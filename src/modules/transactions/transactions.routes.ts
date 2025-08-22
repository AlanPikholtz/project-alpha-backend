import { FastifyInstance } from 'fastify';
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getAllTransactionsHandler,
  getTransactionHandler,
  updateTransactionHandler,
} from './transactions.controller.js';

import {
  createTransactionSchema,
  deleteTransactionSchema,
  getAllTransactionsSchema,
  getTransactionSchema,
  updateTransactionSchema,
} from './transactions.schema.js';

export default async function transactionRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    '/transactions',
    { schema: getAllTransactionsSchema, preValidation: [fastify.authenticate] },
    getAllTransactionsHandler,
  );

  fastify.get(
    '/transactions/:id',
    { schema: getTransactionSchema, preValidation: [fastify.authenticate] },
    getTransactionHandler,
  );

  fastify.post(
    '/transactions',
    { schema: createTransactionSchema, preValidation: [fastify.authenticate] },
    createTransactionHandler,
  );

  fastify.put(
    '/transactions/:id',
    { schema: updateTransactionSchema, preValidation: [fastify.authenticate] },
    updateTransactionHandler,
  );

  fastify.delete(
    '/transactions/:id',
    { schema: deleteTransactionSchema, preValidation: [fastify.authenticate] },
    deleteTransactionHandler,
  );
}
