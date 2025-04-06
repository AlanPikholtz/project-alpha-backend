import { normalizeRow } from "../../utils/db.js";

export async function insertTransaction(fastify, date, type, amount, currency) {
  const [result] = await fastify.mysql.execute(
    "INSERT INTO transactions (date, type, amount, currency) VALUES (?, ?, ?, ?)",
    [date, type, amount, currency]
  );
  return result;
}

export async function fetchTransactionsByClientId(fastify, clientId) {
  const [rows] = await fastify.mysql.execute(
    "SELECT * FROM transactions WHERE client_id = ? ORDER BY created_at DESC",
    [clientId]
  );

  const data = rows.map((row) => normalizeRow(row));

  return data;
}

export async function fetchTransactionById(fastify, id) {
  const [rows] = await fastify.mysql.execute(
    "SELECT * FROM transactions WHERE id = ?",
    [id]
  );

  const data = normalizeRow(rows[0]);

  return data;
}

export async function fetchTransactions(
  fastify,
  status,
  limit,
  offset,
  amount,
  from,
  to
) {
  let query = "SELECT * FROM transactions";
  const conditions = [];
  const params = [];

  if (status === "assigned") {
    conditions.push("client_id IS NOT NULL");
  } else if (status === "unassigned") {
    conditions.push("client_id IS NULL");
  }

  if (amount) {
    conditions.push("amount = ?");
    params.push(amount);
  }

  if (from) {
    conditions.push("date >= ?");
    params.push(from);
  }
  if (to) {
    conditions.push("date <= ?");
    params.push(to);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY created_at DESC";

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query, params);

  const data = rows.map((row) => normalizeRow(row));

  return data;
}

export async function fetchCountTransactions(
  fastify,
  status,
  amount,
  from,
  to
) {
  let query = "SELECT COUNT(*) as total FROM transactions";
  const conditions = [];
  const params = [];

  if (status === "assigned") {
    conditions.push("client_id IS NOT NULL");
  } else if (status === "unassigned") {
    conditions.push("client_id IS NULL");
  }

  if (amount) {
    conditions.push("amount = ?");
    params.push(amount);
  }

  if (from) {
    conditions.push("date >= ?");
    params.push(from);
  }
  if (to) {
    conditions.push("date <= ?");
    params.push(to);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const [rows] = await fastify.mysql.execute(query, params);

  return rows[0].total;
}

export async function putTransactionAndUpdateBalance(
  fastify,
  transactionId,
  clientId,
  accountId,
  clientBalance,
  commissionAmount,
  oldClientId,
  oldClientBalance
) {
  const conn = await fastify.mysql.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      "UPDATE transactions SET client_id = ?, account_id = ?, commission_amount = ?, assigned_at = UTC_TIMESTAMP() WHERE id = ?",
      [clientId, accountId, commissionAmount, transactionId]
    );

    await conn.query("UPDATE clients SET balance = ? WHERE id = ?", [
      clientBalance,
      clientId,
    ]);

    await conn.query("UPDATE clients SET balance = ? WHERE id = ?", [
      oldClientBalance,
      oldClientId,
    ]);

    await conn.commit();
    conn.release();

    return true;
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }
}
