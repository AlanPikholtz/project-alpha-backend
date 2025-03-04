import { loginHandler, registerHandler } from "./auth.controller.js";

import { loginSchema, registerSchema } from "./auth.schema.js";

export default async function authRoutes(fastify) {
  fastify.post("/auth/register", { schema: registerSchema }, registerHandler);
  fastify.post("/auth/login", { schema: loginSchema }, loginHandler);
}
