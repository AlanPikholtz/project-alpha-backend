export async function insertTransaction(
  fastify,
  clientId,
  accountId,
  type,
  amount
) {
  const [result] = await fastify.mysql.query(
    "INSERT INTO transactions (client_id, account_id, type, amount) VALUES (?, ?, ?, ?)",
    [clientId, accountId, type, amount]
  );
  return result;
}

export async function fetchTransactionsByClientId(fastify, clientId) {
  const [rows] = await fastify.mysql.query(
    "SELECT * FROM transactions WHERE client_id = ? ORDER BY created_at DESC",
    [clientId]
  );
  return rows;
}
