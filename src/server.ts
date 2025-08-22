import fastify from './app.js';

const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    fastify.log.info(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
