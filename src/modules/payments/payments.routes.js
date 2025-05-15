import {
  createPaymentHandler,
  getAllPaymentsHandler,
} from "./payments.controller.js";
import {
  createPaymentSchema,
  getAllPaymentsSchema,
} from "./payments.schema.js";

export default async function paymentRoutes(fastify) {
  fastify.get(
    "/payments",
    { schema: getAllPaymentsSchema, preValidation: [fastify.authenticate] },
    getAllPaymentsHandler
  );

  fastify.post(
    "/payments",
    { schema: createPaymentSchema, preValidation: [fastify.authenticate] },
    createPaymentHandler
  );
}
