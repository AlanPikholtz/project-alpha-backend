import {
  createClientHandler,
  getAllClientsHandler,
  getClientHandler,
  getClientsByAccountHandler,
  updateClientHandler,
} from "./clients.controller.js";

import {
  createClientSchema,
  getAllClientsSchema,
  getClientsByAccountSchema,
  getClientSchema,
  updateClientSchema,
} from "./clients.schema.js";

export default async function clientRoutes(fastify) {
  fastify.get(
    "/clients",
    { schema: getAllClientsSchema, preValidation: [fastify.authenticate] },
    getAllClientsHandler
  );

  fastify.get(
    "/clients/:id",
    {
      schema: getClientSchema,
      preValidation: [fastify.authenticate],
    },
    getClientHandler
  );

  fastify.put(
    "/clients/:id",
    {
      schema: updateClientSchema,
      preValidation: [fastify.authenticate],
    },
    updateClientHandler
  );

  fastify.post(
    "/clients",
    { schema: createClientSchema, preValidation: [fastify.authenticate] },
    createClientHandler
  );

  fastify.get(
    "/clients/account/:accountId",
    {
      schema: getClientsByAccountSchema,
      preValidation: [fastify.authenticate],
    },
    getClientsByAccountHandler
  );
}
