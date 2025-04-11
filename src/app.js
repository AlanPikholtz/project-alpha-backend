import ajvErrors from "ajv-errors";
import Fastify from "fastify";
import db from "./config/db.js";
import env from "./config/env.js";
import errorHandler from "./middlewares/errorHandler.js";
import accountRoutes from "./modules/accounts/accounts.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import clientRoutes from "./modules/clients/clients.routes.js";
import metricsRoutes from "./modules/metrics/metrics.routes.js";
import transactionRoutes from "./modules/transactions/transactions.routes.js";
import corsPlugin from "./plugins/cors.js";
import helmetPlugin from "./plugins/helmet.js";
import jwtPlugin from "./plugins/jwt.js";
import rateLimitPlugin from "./plugins/rateLimit.js";
import swaggerPlugin from "./plugins/swagger.js";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
  ajv: {
    customOptions: {
      allErrors: true,
    },
    plugins: [ajvErrors],
  },
});

fastify.setErrorHandler(errorHandler);

await fastify.register(env);
await fastify.register(db);
await fastify.register(jwtPlugin);
await fastify.register(corsPlugin);
await fastify.register(swaggerPlugin);
await fastify.register(helmetPlugin);
await fastify.register(rateLimitPlugin);

await fastify.register(authRoutes);
await fastify.register(clientRoutes);
await fastify.register(transactionRoutes);
await fastify.register(accountRoutes);
await fastify.register(metricsRoutes);

export default fastify;
