import {
getMetricsHandler
} from "./metrics.controller.js";

import {
  getMetricsSchema
} from "./metrics.schema.js";

export default async function metricsRoutes(fastify) {
  fastify.get(
    "/metrics",
    { schema: getMetricsSchema, preValidation: [fastify.authenticate] },
    getMetricsHandler
  );

 
}
