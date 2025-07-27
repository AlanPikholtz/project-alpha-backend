import { normalizeRow } from "../../utils/db.js";

export async function insertPayment(
  fastify,
  paymentRequestDate,
  amount,
  currency,
  method,
  clientId,
  newClientBalance
) {
  const conn = await fastify.mysql.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      "INSERT INTO payments (payment_request_date, amount, currency, method, client_id) VALUES (?, ?, ?, ?, ?)",
      [paymentRequestDate, amount, currency, method, clientId]
    );

    await conn.query("UPDATE clients SET balance = ? WHERE id = ?", [
      newClientBalance,
      clientId,
    ]);

    await conn.query(
      "INSERT INTO client_balance_history (client_id, balance) VALUES (?, ?)",
      [clientId, newClientBalance]
    );

    await conn.commit();
    conn.release();

    return result;
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }
}

export async function fetchPayments(fastify, limit, offset, amount) {
  let query =
    "SELECT p.*, c.code as client_code FROM payments p JOIN clients c ON p.client_id = c.id";
  const conditions = [];
  const params = [];

  conditions.push("p.is_deleted = FALSE");

  if (amount) {
    conditions.push("p.amount = ?");
    params.push(amount);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY p.payment_request_date DESC";

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query, params);

  const data = rows.map((row) => normalizeRow(row));
  return data;
}

export async function fetchCountPayments(fastify, amount) {
  let query = "SELECT COUNT(*) AS total FROM payments";
  const conditions = [];
  const params = [];

  conditions.push("is_deleted = FALSE");

  if (amount) {
    conditions.push("amount = ?");
    params.push(amount);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const [rows] = await fastify.mysql.query(query, params);

  return rows[0].total;
}

export async function fetchPaymentById(fastify, id, withDeleted = false) {
  let query = "SELECT * FROM payments";
  const conditions = [];
  const params = [];

  if (!withDeleted) {
    conditions.push("is_deleted = FALSE");
  }

  conditions.push("id = ?");
  params.push(id);

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const [rows] = await fastify.mysql.execute(query, params);

  const data = normalizeRow(rows[0]);
  return data;
}

export async function deletePaymentAndUpdateBalance(
  fastify,
  paymentId,
  clientId,
  newClientBalance
) {
  const conn = await fastify.mysql.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      "UPDATE payments SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?",
      [paymentId]
    );

    await conn.query("UPDATE clients SET balance = ? WHERE id = ?", [
      newClientBalance,
      clientId,
    ]);

    await conn.query(
      "INSERT INTO client_balance_history (client_id, balance) VALUES (?, ?)",
      [clientId, newClientBalance]
    );

    await conn.commit();
    conn.release();

    return true;
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }
}
