import { getMetrics } from "./metrics.service.js";

export async function getMetricsHandler(req, reply) {
  try {
    const { date } = req.query;

    req.log.info(`📥 Request received: GET /metrics`);

    console.time("⏱️ GET /metrics execution time");
    const metrics = await getMetrics(req.server, date);
    console.timeEnd("⏱️ GET /metrics execution time");

    req.log.info("✅ Metrics retrieved successfuly");

    return reply.send(metrics);
  } catch (error) {
    req.log.error(`❌ Error retrieving metrics: ${error.message}`);
    throw error;
  }
}
