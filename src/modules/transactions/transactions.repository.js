import { normalizeRow } from "../../utils/db.js";

export async function fetchTransactionsByIds(fastify, transactionIds) {
  const placeholders = transactionIds.map(() => "?").join(",");

  const [rows] = await fastify.mysql.query(
    `SELECT * FROM transactions WHERE id IN (${placeholders}) AND is_deleted = FALSE`,
    transactionIds
  );

  const data = rows.map((row) => normalizeRow(row));
  return data;
}

export async function insertTransaction(
  fastify,
  date,
  type,
  amount,
  currency,
  accountId
) {
  const [result] = await fastify.mysql.execute(
    "INSERT INTO transactions (date, type, amount, currency, account_id) VALUES (?, ?, ?, ?, ?)",
    [date, type, amount, currency, accountId]
  );
  return result;
}

export async function bulkInsertTransactions(fastify, transactions, accountId) {
  const values = [];
  const placeholders = transactions
    .map((t) => {
      values.push(t.date, t.type, t.amount, t.currency, accountId);
      return "(?, ?, ?, ?, ?)";
    })
    .join(", ");

  const sql = `
  INSERT INTO transactions (date, type, amount, currency, account_id)
  VALUES ${placeholders}
  `;

  const [result] = await fastify.mysql.execute(sql, values);
  return result.affectedRows;
}

export async function fetchTransactionById(fastify, id) {
  const [rows] = await fastify.mysql.execute(
    "SELECT * FROM transactions WHERE id = ? AND is_deleted = FALSE",
    [id]
  );

  const data = normalizeRow(rows[0]);

  return data;
}

export async function fetchTransactions(
  fastify,
  status,
  clientId,
  accountId,
  limit,
  offset,
  amount,
  from,
  to,
  sort,
  order
) {
  let query = `
    SELECT 
      t.*, 
      CONCAT_WS(' ', c.first_name, c.last_name) AS clientFullName
    FROM transactions t
    LEFT JOIN clients c ON t.client_id = c.id`;
  const conditions = [];
  const params = [];

  if (accountId) {
    conditions.push("t.account_id = ?");
    params.push(accountId);
  }

  if (clientId) {
    conditions.push("t.client_id = ?");
    params.push(clientId);
  } else if (status === "assigned") {
    conditions.push("t.client_id IS NOT NULL");
  } else if (status === "unassigned") {
    conditions.push("t.client_id IS NULL");
  }

  if (amount) {
    conditions.push("t.amount = ?");
    params.push(amount);
  }

  if (from) {
    conditions.push("t.date >= ?");
    params.push(from);
  }
  if (to) {
    conditions.push("t.date <= ?");
    params.push(to);
  }

  conditions.push("t.is_deleted = FALSE");

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const validSortFields = {
    date: "date",
    createdAt: "created_at",
    assignedAt: "assigned_at",
  };

  const sortField = validSortFields[sort];
  const sortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

  query += ` ORDER BY ${sortField} ${sortOrder}`;

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query, params);

  const data = rows.map((row) => normalizeRow(row));

  return data;
}

export async function fetchTransactionsByAmountAndDate(fastify, transactions) {
  const placeholders = transactions.map(() => "(?, ?)").join(", ");
  const values = transactions.flatMap((t) => [t.amount, t.date]);

  const [rows] = await fastify.mysql.query(
    `SELECT id, date, amount, type FROM transactions WHERE (amount, date) IN (${placeholders}) AND is_deleted = FALSE`,
    values
  );

  return rows;
}

export async function fetchCountTransactions(
  fastify,
  status,
  accountId,
  clientId,
  amount,
  from,
  to
) {
  let query = "SELECT COUNT(*) as total FROM transactions";
  const conditions = [];
  const params = [];

  if (accountId) {
    conditions.push("account_id = ?");
    params.push(accountId);
  }

  if (clientId) {
    conditions.push("client_id = ?");
    params.push(clientId);
  } else if (status === "assigned") {
    conditions.push("client_id IS NOT NULL");
  } else if (status === "unassigned") {
    conditions.push("client_id IS NULL");
  }

  if (amount) {
    conditions.push("amount = ?");
    params.push(amount);
  }

  if (from) {
    conditions.push("date >= ?");
    params.push(from);
  }
  if (to) {
    conditions.push("date <= ?");
    params.push(to);
  }

  conditions.push("is_deleted = FALSE");

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const [rows] = await fastify.mysql.execute(query, params);

  return rows[0].total;
}

export async function putTransactionsAndUpdateBalance(
  fastify,
  transactions,
  clientId,
  newClientBalance,
  amountByPreviousClient
) {
  const conn = await fastify.mysql.getConnection();

  try {
    await conn.beginTransaction();

    transactions.forEach(async (t) => {
      await conn.query(
        "UPDATE transactions SET client_id = ?, commission_amount = ?, assigned_at = UTC_TIMESTAMP() WHERE id = ?",
        [clientId, t.commissionAmount, t.id]
      );
    });

    await conn.query("UPDATE clients SET balance = ? WHERE id = ?", [
      newClientBalance,
      clientId,
    ]);

    await conn.query(
      "INSERT INTO client_balance_history (client_id, balance) VALUES (?, ?)",
      [clientId, newClientBalance]
    );

    for (const [oldClientId, oldClientBalance] of Object.entries(
      amountByPreviousClient
    )) {
      await conn.query("UPDATE clients SET balance = ? WHERE id = ?", [
        oldClientBalance.toString(),
        oldClientId,
      ]);

      await conn.query(
        "INSERT INTO client_balance_history (client_id, balance) VALUES (?, ?)",
        [oldClientId, oldClientBalance.toString()]
      );
    }

    await conn.commit();
    conn.release();

    return true;
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }
}

export async function deleteTransactionsByIds(fastify, transactionIds) {
  const placeholders = transactionIds.map(() => "?").join(",");

  const [rows] = await fastify.mysql.query(
    `UPDATE transactions SET is_deleted = TRUE, deleted_at = NOW() WHERE id IN (${placeholders})`,
    transactionIds
  );

  return rows.affectedRows == transactionIds.length;
}

export async function putUnassignedTransactionAndUpdateBalance(
  fastify,
  transaction,
  clientId,
  newClientBalance
) {
  const conn = await fastify.mysql.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      "UPDATE transactions SET client_id = ?, commission_amount = ?, assigned_at = ? WHERE id = ?",
      [null, null, null, transaction.id]
    );

    await conn.query("UPDATE clients SET balance = ? WHERE id = ?", [
      newClientBalance,
      clientId,
    ]);

    await conn.query(
      "INSERT INTO client_balance_history (client_id, balance) VALUES (?, ?)",
      [clientId, newClientBalance]
    );

    await conn.commit();
    conn.release();

    return true;
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }
}
