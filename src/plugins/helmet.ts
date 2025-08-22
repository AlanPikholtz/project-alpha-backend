import helmet from '@fastify/helmet';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(helmet);
  fastify.log.info('✅ Helmet security headers enabled');
});
