export async function fetchMetrics(fastify, start, end) {
  const [
    [[{ totalClients }]],
    [clientsPerAccount],
    [depositsPerClient],
    [commissionsPerClient],
    [[{ totalDeposits }]],
    [[{ totalCommissions }]],
    [[{ unassignedDeposits }]],
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

    fastify.mysql.query(
      `
      SELECT 
        c.id AS clientId,
        CONCAT(c.first_name, ' ', c.last_name) AS clientFullName,
        SUM(t.amount) AS totalDeposits
      FROM transactions t
      JOIN clients c ON t.client_id = c.id
      WHERE t.type = 'deposit'
        AND t.client_id IS NOT NULL
        AND t.date BETWEEN ? AND ?
      GROUP BY c.id, c.first_name
    `,
      [start, end]
    ),

    fastify.mysql.query(
      `
      SELECT 
        c.id AS clientId,
        CONCAT(c.first_name, ' ', c.last_name) AS clientFullName,
        SUM(t.commission_amount) AS totalCommissions
      FROM transactions t
      JOIN clients c ON t.client_id = c.id
      WHERE t.type = 'deposit'
        AND t.client_id IS NOT NULL
        AND t.date BETWEEN ? AND ?
      GROUP BY c.id, c.first_name
    `,
      [start, end]
    ),

    fastify.mysql.query(
      `
      SELECT SUM(amount) AS totalDeposits
      FROM transactions
      WHERE type = 'deposit'
      AND date BETWEEN ? AND ?
    `,
      [start, end]
    ),

    fastify.mysql.query(
      `
      SELECT SUM(commission_amount) AS totalCommissions
      FROM transactions
      WHERE type = 'deposit'
      AND date BETWEEN ? AND ?
    `,
      [start, end]
    ),

    fastify.mysql.query(
      `
      SELECT COUNT(*) AS unassignedDeposits
      FROM transactions
      WHERE type = 'deposit' AND client_id IS NULL
      AND date BETWEEN ? AND ?;
    `,
      [start, end]
    ),
  ]);

  return {
    totalClients,
    clientsPerAccount,
    depositsPerClient,
    commissionsPerClient,
    totalDeposits,
    totalCommissions,
    unassignedDeposits,
  };
}
