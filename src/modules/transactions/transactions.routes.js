import {
  bulkCreateTransactionsHandler,
  createTransactionHandler,
  getTransactionsHandler,
  updateTransactionHandler,
} from "./transactions.controller.js";

import {
  bulkCreateTransactionsSchema,
  createTransactionSchema,
  getTransactionsSchema,
  updateTransactionSchema,
} from "./transactions.schema.js";

export default async function transactionRoutes(fastify) {
  fastify.post(
    "/transactions",
    {
      schema: createTransactionSchema,
      preValidation: [fastify.authenticate],
    },
    createTransactionHandler
  );

  fastify.post(
    "/transactions/account/:accountId/bulk",
    {
      schema: bulkCreateTransactionsSchema,
      preValidation: [fastify.authenticate],
    },
    bulkCreateTransactionsHandler
  );

  fastify.get(
    "/transactions",
    {
      schema: getTransactionsSchema,
      preValidation: [fastify.authenticate],
    },
    getTransactionsHandler
  );

  fastify.put(
    "/transactions/:id",
    {
      schema: updateTransactionSchema,
      preValidation: [fastify.authenticate],
    },
    updateTransactionHandler
  );
}
