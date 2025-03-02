import fastifyEnv from "@fastify/env";
import dotenv from "dotenv";
import fp from "fastify-plugin";

const ENV_FILE =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: ENV_FILE });

const schema = {
  type: "object",
  properties: {
    PORT: { type: "string", default: "3000" },
    HOST: { type: "string", default: "0.0.0.0" },
    DB_HOST: { type: "string" },
    DB_USER: { type: "string" },
    DB_PASS: { type: "string" },
    DB_NAME: { type: "string" },
    DB_PORT: { type: "string" },
    JWT_SECRET: { type: "string" },
  },
  required: [
    "DB_HOST",
    "DB_USER",
    "DB_PASS",
    "DB_NAME",
    "DB_PORT",
    "JWT_SECRET",
  ],
};

export default fp(async (fastify) => {
  try {
    await fastify.register(fastifyEnv, { schema });
  } catch (err) {
    console.error(
      "❌ Error en la validación de variables de entorno:",
      err.message
    );
    process.exit(1);
  }
});
