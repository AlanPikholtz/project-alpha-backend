export async function insertClient(
  fastify,
  firstName,
  lastName,
  code,
  balance,
  commission,
  userId
) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO clients (first_name, last_name, code, balance, commission, updated_by) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, code, balance, commission, userId]
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
  balance,
  commission,
  userId
) {
  const [result] = await fastify.mysql.execute(
    "UPDATE clients SET first_name = ?, last_name = ?, balance = ?, commission = ?, updated_by = ? WHERE id = ?",
    [firstName, lastName, balance, commission, userId, clientId]
  );
  return result.affectedRows != 0;
}
