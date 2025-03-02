import { loginHandler, registerHandler } from "./users.controller.js";

import { loginSchema, registerSchema } from "./users.schema.js";

export default async function userRoutes(fastify) {
  fastify.post("/users/register", { schema: registerSchema }, registerHandler);
  fastify.post("/users/login", { schema: loginSchema }, loginHandler);
}
