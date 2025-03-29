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
    "INSERT INTO clients (first_name, last_name, code, balance, commission, notes, accountId) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, code, balance, commission, notes, accountId]
  );
  return result;
}

export async function fetchClients(fastify, limit, offset) {
  let query = "SELECT * FROM clients";
  let params = [];

  if (limit !== null) {
    query += " LIMIT ? OFFSET ?";
    params = [limit, offset];
  }

  const [rows] = await fastify.mysql.query(query, params);
  return rows;
}

export async function fetchClientById(fastify, id) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM clients WHERE id = ?",
    [id]
  );
  return rows[0];
}

export async function fetchClientByCode(fastify, code) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM clients WHERE code = ?",
    [code]
  );
  return rows[0];
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
    "UPDATE clients SET first_name = ?, last_name = ?, commission = ?, notes = ?, accountId = ? WHERE id = ?",
    [firstName, lastName, commission, notes, accountId, clientId]
  );
  return result.affectedRows != 0;
}
