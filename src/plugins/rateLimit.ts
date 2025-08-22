import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  fastify.log.info('✅ Rate limiting enabled');
});
