import fastify from "./app.js";


const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Servidor corriendo en ${address}`);
});
