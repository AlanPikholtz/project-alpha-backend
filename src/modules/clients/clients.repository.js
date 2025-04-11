import { normalizeRow } from "../../utils/db.js";

export async function insertClient(
  fastify,
  firstName,
  lastName,
  code,
  balance,
  commission,
  notes,
  accountId
) {
  const [result] = await fastify.mysql.execute(
    "INSERT INTO clients (first_name, last_name, code, balance, commission, notes, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, code, balance, commission, notes, accountId]
  );
  return result;
}

export async function fetchClients(fastify, limit, offset, accountId) {
  let query = "SELECT * FROM clients";
  const params = [];

  if (accountId) {
    query += " WHERE account_id = ?";
    params.push(accountId);
  }

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query, params);

  const data = rows.map((row) => normalizeRow(row));
  return data;
}

export async function fetchCountClients(fastify, accountId) {
  let query = "SELECT COUNT(*) AS total FROM clients";
  const params = [];

  if (accountId) {
    query += " WHERE account_id = ?";
    params.push(accountId);
  }

  const [rows] = await fastify.mysql.execute(query, params);

  return rows[0].total;
}

export async function fetchClientById(fastify, id) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM clients WHERE id = ?",
    [id]
  );

  const data = normalizeRow(rows[0]);
  return data;
}

export async function fetchClientByCode(fastify, code) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM clients WHERE code = ?",
    [code]
  );
  const data = normalizeRow(rows[0]);
  return data;
}

export async function putClient(
  fastify,
  clientId,
  firstName,
  lastName,
  commission,
  notes,
  accountId
) {
  const [result] = await fastify.mysql.execute(
    "UPDATE clients SET first_name = ?, last_name = ?, commission = ?, notes = ?, account_id = ? WHERE id = ?",
    [firstName, lastName, commission, notes, accountId, clientId]
  );
  return result.affectedRows != 0;
}
