import ajvErrors from "ajv-errors";
import Fastify from "fastify";
import db from "./config/db.js";
import env from "./config/env.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./modules/users/users.routes.js";
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

await fastify.register(userRoutes);

export default fastify;
