export async function insertClient(fastify, name) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO clients (name) VALUES (?)",
    [name]
  );
  return result;
}

export async function fetchClients(fastify, limit, offset) {
  let query = "SELECT id, name, created_at, updated_at FROM clients";
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
