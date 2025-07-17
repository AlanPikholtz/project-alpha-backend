import {
  createPaymentHandler,
  deletePaymentHandler,
  getAllPaymentsHandler,
} from "./payments.controller.js";
import {
  createPaymentSchema,
  deletePaymentSchema,
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

  fastify.delete(
    "/payments/:id",
    {
      schema: deletePaymentSchema,
      preValidation: [fastify.authenticate],
    },
    deletePaymentHandler
  );
}
