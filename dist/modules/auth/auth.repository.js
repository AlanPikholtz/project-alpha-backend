export async function fetchUserByUsername(fastify, username) {
    const [rows] = await fastify.mysql.execute("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
}
export async function fetchUserById(fastify, id) {
    const [rows] = await fastify.mysql.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}
export async function insertUser(fastify, username, password) {
    const [result] = await fastify.mysql.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
    return result;
}
