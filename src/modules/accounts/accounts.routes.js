import {
  createAccountHandler,
  getAccountHandler,
  getAllAccountsHandler,
} from "./accounts.controller.js";

import {
  createAccountSchema,
  getAccountSchema,
  getAllAccountsSchema,
} from "./accounts.schema.js";

export default async function clientRoutes(fastify) {
  fastify.get(
    "/accounts",
    { schema: getAllAccountsSchema, preValidation: [fastify.authenticate] },
    getAllAccountsHandler
  );

  fastify.get(
    "/accounts/:id",
    {
      schema: getAccountSchema,
      preValidation: [fastify.authenticate],
    },
    getAccountHandler
  );

  fastify.post(
    "/accounts",
    { schema: createAccountSchema, preValidation: [fastify.authenticate] },
    createAccountHandler
  );
}
