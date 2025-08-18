import {
  createPayment,
  deletePayment,
  getAllPayments,
} from "./payments.service.js";

export async function getAllPaymentsHandler(req, reply) {
  try {
    var { amount, limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(
      `📥 Request received: GET /payments?limit=${limit}&page=${page}`
    );

    const result = await getAllPayments(
      req.server,
      limit,
      offset,
      page,
      amount
    );

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

export async function deletePaymentHandler(req, reply) {
  try {
    const { id } = req.params;

    req.log.info(`📥 Deleting payment ${id}`);

    await deletePayment(req.server, id);

    req.log.info(`✅ Payment deleted successfully - Payment id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error deleting payment: ${error.message}`);
    throw error;
  }
}
