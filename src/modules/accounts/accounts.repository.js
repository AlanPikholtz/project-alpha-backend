import { normalizeRow } from "../../utils/db.js";

export async function insertAccount(fastify, name) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO accounts (name) VALUES (?)",
    [name]
  );
  return result;
}

export async function fetchAccounts(fastify, limit, offset) {
  let query = "SELECT * FROM accounts";

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query);

  const data = rows.map((row) => normalizeRow(row));
  return data;
}

export async function fetchCountAccounts(fastify) {
  let query = "SELECT COUNT(*) AS total FROM accounts";

  const [rows] = await fastify.mysql.query(query);

  return rows[0].total;
}

export async function fetchAccountById(fastify, id) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM accounts WHERE id = ?",
    [id]
  );
  const data = normalizeRow(rows[0]);
  return data;
}

export async function putAccount(fastify, id, name) {
  const [result] = await fastify.mysql.execute(
    "UPDATE accounts SET name = ? WHERE id = ?",
    [name, id]
  );
  return result.affectedRows != 0;
}
