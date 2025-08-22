import jwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { ERROR_TYPES } from '../constants/errorTypes.js';

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      await request.jwtVerify();
    } catch (err: any) {
      throw {
        isCustom: true,
        statusCode: 401,
        errorType: ERROR_TYPES.UNAUTHORIZED,
        message: 'Token incorrecto o no existente.',
      };
    }
  });
});
