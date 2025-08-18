import { getMetrics } from "./metrics.service.js";

export async function getMetricsHandler(req, reply) {
  try {
    const { date } = req.query;

    req.log.info(`📥 Request received: GET /metrics`);

    const metrics = await getMetrics(req.server, date);

    req.log.info("✅ Metrics retrieved successfuly");

    return reply.send(metrics);
  } catch (error) {
    req.log.error(`❌ Error retrieving metrics: ${error.message}`);
    throw error;
  }
}
