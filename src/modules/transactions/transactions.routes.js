import {
  assignTransactionsHandler,
  bulkCreateTransactionsHandler,
  createTransactionHandler,
  getTransactionsHandler,
} from "./transactions.controller.js";

import {
  assignTransactionsSchema,
  bulkCreateTransactionsSchema,
  createTransactionSchema,
  getTransactionsSchema,
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
    "/transactions/client/:clientId",
    {
      schema: assignTransactionsSchema,
      preValidation: [fastify.authenticate],
    },
    assignTransactionsHandler
  );
}
