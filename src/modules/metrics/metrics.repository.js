export async function fetchMetrics(fastify) {
  const [
    [[{ totalClients }]],
    [clientsPerAccount],
    [depositsPerClient],
    [commissionsPerClient],
    [[{ totalDeposits }]],
    [[{ totalCommissions }]],
  ] = await Promise.all([
    fastify.mysql.query("SELECT COUNT(*) AS totalClients FROM clients"),

    fastify.mysql.query(`
      SELECT 
        a.id AS accountId,
        a.name AS accountName,
        COUNT(c.id) AS totalClients
      FROM accounts a
      LEFT JOIN clients c ON c.account_id = a.id
      GROUP BY a.id, a.name
    `),

    fastify.mysql.query(`
      SELECT 
        c.id AS clientId,
        c.first_name AS clientName,
        SUM(t.amount) AS totalDeposits
      FROM transactions t
      JOIN clients c ON t.client_id = c.id
      WHERE t.type = 'deposit'
        AND t.client_id IS NOT NULL
      GROUP BY c.id, c.first_name
    `),

    fastify.mysql.query(`
      SELECT 
        c.id AS clientId,
        c.first_name AS clientName,
        SUM(t.commission_amount) AS totalCommissions
      FROM transactions t
      JOIN clients c ON t.client_id = c.id
      WHERE t.type = 'deposit'
        AND t.client_id IS NOT NULL
      GROUP BY c.id, c.first_name
    `),

    fastify.mysql.query(`
      SELECT SUM(amount) AS totalDeposits
      FROM transactions
      WHERE type = 'deposit'
    `),

    fastify.mysql.query(`
      SELECT SUM(commission_amount) AS totalCommissions
      FROM transactions
      WHERE type = 'deposit'
    `),
  ]);

  return {
    totalClients,
    clientsPerAccount,
    depositsPerClient,
    commissionsPerClient,
    totalDeposits,
    totalCommissions,
  };
}
