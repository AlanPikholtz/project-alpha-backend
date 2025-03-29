export async function insertAccount(fastify, name) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO accounts (name) VALUES (?)",
    [name]
  );
  return result;
}

export async function fetchAccounts(fastify, limit, offset) {
  let query = "SELECT id, name, created_at, updated_at FROM accounts";
  let params = [];

  if (limit !== null) {
    query += " LIMIT ? OFFSET ?";
    params = [limit, offset];
  }

  const [rows] = await fastify.mysql.query(query, params);
  return rows;
}

export async function fetchAccountById(fastify, id) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM accounts WHERE id = ?",
    [id]
  );
  return rows[0];
}

export async function putAccount(fastify, id, name) {
  const [result] = await fastify.mysql.execute(
    "UPDATE accounts SET name = ? WHERE id = ?",
    [name, id]
  );
  return result.affectedRows != 0;
}
