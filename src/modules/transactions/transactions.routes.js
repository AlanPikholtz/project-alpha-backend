import {
  createTransactionHandler,
  getClientTransactionsHandler,
} from "./transactions.controller.js";

import {
  createTransactionSchema,
  getClientTransactionsSchema,
} from "./transactions.schema.js";

export default async function transactionRoutes(fastify) {
  fastify.post(
    "/transactions/client/:clientId",
    {
      schema: createTransactionSchema,
      preValidation: [fastify.authenticate],
    },
    createTransactionHandler
  );

  fastify.get(
    "/transactions/client/:clientId",
    {
      schema: getClientTransactionsSchema,
      preValidation: [fastify.authenticate],
    },
    getClientTransactionsHandler
  );
}
