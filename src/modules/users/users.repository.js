export async function getUserByEmail(fastify, email) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}

export async function createUser(fastify, email, password) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password]
  );
  return { id: result.insertId };
}
