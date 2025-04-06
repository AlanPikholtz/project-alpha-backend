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
  amount
) {
  let query = "SELECT * FROM transactions";
  const params = [];

  var hasStatus = status === "assigned" || status === "unassigned";

  if (status === "assigned") {
    query += " WHERE client_id IS NOT NULL";
  } else if (status === "unassigned") {
    query += " WHERE client_id IS NULL";
  }

  if (amount) {
    if (!hasStatus) {
      query += " WHERE";
    } else {
      query += " AND";
    }
    query += ` amount = ?`;
    params.push(amount);
  }

  query += " ORDER BY created_at DESC";

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query, params);

  const data = rows.map((row) => normalizeRow(row));

  return data;
}

export async function fetchCountTransactions(fastify, status, amount) {
  let query = "SELECT COUNT(*) as total FROM transactions";
  const params = [];
  var hasStatus = status === "assigned" || status === "unassigned";
  if (status === "assigned") {
    query += " WHERE client_id IS NOT NULL";
  } else if (status === "unassigned") {
    query += " WHERE client_id IS NULL";
  }

  if (amount) {
    if (!hasStatus) {
      query += " WHERE";
    } else {
      query += " AND";
    }
    query += ` amount = ?`;
    params.push(amount);
  }

  const [rows] = await fastify.mysql.query(query, params);

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
