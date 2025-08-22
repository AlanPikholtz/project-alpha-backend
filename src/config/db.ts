import fastifyMysql from '@fastify/mysql';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(fastifyMysql, {
    promise: true,
    connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?dateStrings=true`,
  });
});
