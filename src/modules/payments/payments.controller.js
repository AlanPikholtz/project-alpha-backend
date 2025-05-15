import { createPayment, getAllPayments } from "./payments.service.js";

export async function getAllPaymentsHandler(req, reply) {
  try {
    var { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(
      `📥 Request received: GET /payments?limit=${limit}&page=${page}`
    );

    console.time("⏱️ GET /payments execution time");
    const result = await getAllPayments(req.server, limit, offset, page);
    console.timeEnd("⏱️ GET /payments execution time");

    req.log.info(`✅ Payments retrieved: ${result.total} records found`);

    return reply.send(result);
  } catch (error) {
    req.log.error(`❌ Error retrieving payments: ${error.message}`);
    throw error;
  }
}

export async function createPaymentHandler(req, reply) {
  try {
    const { paymentRequestDate, amount, currency, method, clientId } = req.body;

    req.log.info(
      `📥 Creating payment: date ${paymentRequestDate} - amount ${amount} - currency ${currency}`
    );

    const paymentId = await createPayment(
      req.server,
      paymentRequestDate,
      amount,
      currency,
      method,
      clientId
    );

    req.log.info(`✅ Payment created with ID: ${paymentId}`);

    return reply.status(201).send(paymentId);
  } catch (error) {
    req.log.error(`❌ Error creating payment: ${error.message}`);
    throw error;
  }
}
