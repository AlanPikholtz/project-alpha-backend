export async function fetchUserByEmail(fastify, email) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}

export async function fetchUserById(fastify, id) {
  const [rows] = await fastify.mysql.query("SELECT * FROM users WHERE id = ?", [
    id,
  ]);
  return rows[0];
}

export async function insertUser(fastify, email, password) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password]
  );
  return result;
}
