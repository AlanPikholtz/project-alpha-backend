import jwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { ERROR_TYPES } from "../constants/errorTypes.js";

export default fp(async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw {
        isCustom: true,
        statusCode: 401,
        errorType: ERROR_TYPES.UNAUTHORIZED,
        message: "Invalid or missing token.",
      };
    }
  });

  fastify.decorateRequest("userId", null);

  fastify.addHook("onRequest", async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      try {
        const decoded = await request.jwtVerify();
        request.userId = decoded.id || null;
      } catch (err) {
        request.userId = null;
      }
    }
  });
});
