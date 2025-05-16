import { normalizeRow } from "../../utils/db.js";

export async function insertPayment(
  fastify,
  paymentRequestDate,
  amount,
  currency,
  method,
  clientId
) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO payments (payment_request_date, amount, currency, method, client_id) VALUES (?, ?, ?, ?, ?)",
    [paymentRequestDate, amount, currency, method, clientId]
  );
  return result;
}

export async function fetchPayments(fastify, limit, offset) {
  let query =
    "SELECT p.*, c.code as client_code FROM payments p JOIN clients c ON p.client_id = c.id ORDER BY payment_request_date DESC";

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query);

  const data = rows.map((row) => normalizeRow(row));
  return data;
}

export async function fetchCountPayments(fastify) {
  let query = "SELECT COUNT(*) AS total FROM payments";

  const [rows] = await fastify.mysql.query(query);

  return rows[0].total;
}
