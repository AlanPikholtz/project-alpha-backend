import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'My API',
        description: 'API documentation',
        version: '1.0.0',
      },
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: '/swagger',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false,
    },
  });

  fastify.log.info('✅ Swagger Docs available at /swagger');
});
