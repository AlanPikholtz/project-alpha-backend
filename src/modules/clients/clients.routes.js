import {
  createClientHandler,
  getAllClientsHandler,
  getClientHandler,
} from "./clients.controller.js";

import {
  createClientSchema,
  getAllClientsSchema,
  getClientSchema,
} from "./clients.schema.js";

export default async function clientRoutes(fastify) {
  fastify.get(
    "/clients",
    { schema: getAllClientsSchema, preValidation: [fastify.authenticate] },
    getAllClientsHandler
  );

  fastify.get("/clients/:id", {
    schema: getClientSchema,
    handler: getClientHandler,
  });

  fastify.post(
    "/clients",
    { schema: createClientSchema, preValidation: [fastify.authenticate] },
    createClientHandler
  );
}
