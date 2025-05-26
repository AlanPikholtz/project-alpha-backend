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

export async function fetchClientOperations(
  fastify,
  clientId,
  limit,
  offset,
  from,
  to,
  sort,
  order
) {
  let query = `
    SELECT date, type, amount, commission_amount, currency, assigned_at
    FROM transactions`;
  const conditions = [];
  const params = [];

  conditions.push("client_id = ?");
  params.push(clientId);

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

  const validSortFields = {
    date: "date",
    assignedAt: "assigned_at",
  };

  const sortField = validSortFields[sort];
  const sortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

  query += ` ORDER BY ${sortField} ${sortOrder}`;

  const [rows] = await fastify.mysql.query(query, params);

  const transactions = rows.map((row) => normalizeRow(row));

  let paymentsQuery = `
    SELECT payment_request_date as date, amount, currency
    FROM payments`;

  const paymentsConditions = [];
  const paymentsParams = [];

  paymentsConditions.push("client_id = ?");
  paymentsParams.push(clientId);

  if (from) {
    paymentsConditions.push("payment_request_date >= ?");
    paymentsParams.push(from);
  }
  if (to) {
    paymentsConditions.push("payment_request_date <= ?");
    paymentsParams.push(to);
  }

  if (paymentsConditions.length > 0) {
    paymentsQuery += " WHERE " + paymentsConditions.join(" AND ");
  }

  const paymentsSortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

  paymentsQuery += ` ORDER BY payment_request_date ${paymentsSortOrder}`;

  const [paymentsRows] = await fastify.mysql.query(
    paymentsQuery,
    paymentsParams
  );

  const payments = paymentsRows.map((row) => normalizeRow(row));
  const normalizedPayments = payments.map((payment) => ({
    ...payment,
    type: "payment",
    assignedAt: payment.date,
    commissionAmount: null,
  }));

  const combined = [...transactions, ...normalizedPayments];

  if (sort === "date") {
    if (order === "asc") {
      combined.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } else {
    if (order === "asc") {
      combined.sort((a, b) => new Date(a.assignedAt) - new Date(b.assignedAt));
    } else {
      combined.sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt));
    }
  }

  return combined;
}

export async function fetchCountOperations(fastify, clientId, from, to) {
  let query = "SELECT COUNT(*) as total FROM transactions";
  const conditions = [];
  const params = [];

  conditions.push("client_id = ?");
  params.push(clientId);

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

  const totalTransactions = rows[0].total;

  let paymentsQuery = "SELECT COUNT(*) as total FROM payments";
  const paymentsConditions = [];
  const paymentsParams = [];

  paymentsConditions.push("client_id = ?");
  paymentsParams.push(clientId);

  if (from) {
    paymentsConditions.push("payment_request_date >= ?");
    paymentsParams.push(from);
  }
  if (to) {
    paymentsConditions.push("payment_request_date <= ?");
    paymentsParams.push(to);
  }

  if (paymentsConditions.length > 0) {
    paymentsQuery += " WHERE " + paymentsConditions.join(" AND ");
  }

  const [paymentsRows] = await fastify.mysql.execute(
    paymentsQuery,
    paymentsParams
  );

  const totalPayments = paymentsRows[0].total;

  return totalTransactions + totalPayments;
}
