import {
  createClientHandler,
  getAllClientsHandler,
  getClientHandler,
  getClientOperationsHandler,
  updateClientHandler,
} from "./clients.controller.js";

import {
  createClientSchema,
  getAllClientsSchema,
  getClientOperationsSchema,
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

  fastify.get(
    "/clients/:id/operations",
    {
      schema: getClientOperationsSchema,
      preValidation: [fastify.authenticate],
    },
    getClientOperationsHandler
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
}
