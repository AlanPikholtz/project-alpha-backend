import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchClientById } from "../clients/clients.repository.js";
import {
  deletePaymentAndUpdateBalance,
  fetchCountPayments,
  fetchPaymentById,
  fetchPayments,
  insertPayment,
} from "./payments.repository.js";

import Decimal from "decimal.js";
import { DateTime } from "luxon";

export async function getAllPayments(fastify, limit, offset, page, amount) {
  const payments = await fetchPayments(fastify, limit, offset, amount);

  const totalPayments = await fetchCountPayments(fastify, amount);
  const totalPages = !limit ? 1 : Math.ceil(totalPayments / limit);

  return {
    data: payments,
    total: totalPayments,
    page: page,
    pages: totalPages,
    limit: limit ?? 0,
  };
}

export async function createPayment(
  fastify,
  paymentRequestDate,
  amount,
  currency,
  method,
  clientId
) {
  const client = await fetchClientById(fastify, clientId);
  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cliente con id ${clientId}.`,
    };

  const parsedDate = DateTime.fromISO(paymentRequestDate, { setZone: true })
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");

  const parsedAmount = new Decimal(amount);
  const newClientBalance = client.balance.minus(parsedAmount).toString();

  const result = await insertPayment(
    fastify,
    parsedDate,
    amount,
    currency,
    method,
    clientId,
    newClientBalance
  );

  return { id: result.insertId };
}

export async function deletePayment(fastify, paymentId) {
  const payment = await fetchPaymentById(fastify, paymentId);
  if (!payment)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró pago con id ${paymentId}.`,
    };

  const client = await fetchClientById(fastify, payment.clientId, true);
  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cliente con id ${clientId}.`,
    };

  client.balance = client.balance.plus(payment.amount);
  const balance = new Decimal(client.balance).toString();

  const succeeded = await deletePaymentAndUpdateBalance(
    fastify,
    paymentId,
    client.id,
    balance
  );

  return { succeeded: succeeded };
}
