import {
  loginHandler,
  refreshHandler,
  registerHandler,
} from "./auth.controller.js";

import { loginSchema, refreshSchema, registerSchema } from "./auth.schema.js";

export default async function authRoutes(fastify) {
  fastify.post("/auth/register", { schema: registerSchema }, registerHandler);
  fastify.post("/auth/login", { schema: loginSchema }, loginHandler);
  fastify.post(
    "/auth/refresh",
    { schema: refreshSchema, preValidation: [fastify.authenticate] },
    refreshHandler
  );
}
