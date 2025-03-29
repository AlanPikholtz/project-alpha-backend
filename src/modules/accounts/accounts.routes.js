import {
  createAccountHandler,
  getAccountHandler,
  getAllAccountsHandler,
  updateAccountHandler,
} from "./accounts.controller.js";

import {
  createAccountSchema,
  getAccountSchema,
  getAllAccountsSchema,
  updateAccountSchema,
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

  fastify.put(
    "/accounts/:id",
    {
      schema: updateAccountSchema,
      preValidation: [fastify.authenticate],
    },
    updateAccountHandler
  );
}
