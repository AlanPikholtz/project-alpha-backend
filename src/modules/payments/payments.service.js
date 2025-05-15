import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchClientById } from "../clients/clients.repository.js";
import {
  fetchCountPayments,
  fetchPayments,
  insertPayment,
} from "./payments.repository.js";

import { DateTime } from "luxon";

export async function getAllPayments(fastify, limit, offset, page) {
  const payments = await fetchPayments(fastify, limit, offset);

  const totalPayments = await fetchCountPayments(fastify);
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

  const result = await insertPayment(
    fastify,
    parsedDate,
    amount,
    currency,
    method,
    clientId
  );
  return { id: result.insertId };
}
