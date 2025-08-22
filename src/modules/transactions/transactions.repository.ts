import { FastifyInstance } from 'fastify';
import { Transaction } from '../../types/entities.js';
import { normalizeRow } from '../../utils/db.js';

interface DatabaseResult {
  insertId: number;
  affectedRows: number;
}

export async function insertTransaction(fastify: FastifyInstance, data: any): Promise<DatabaseResult> {
  const [result] = await fastify.mysql.execute(
    'INSERT INTO transactions (user_id, account_id, transaction_type, amount, currency, description, reference) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      data.user_id,
      data.account_id,
      data.transaction_type,
      data.amount,
      data.currency,
      data.description,
      data.reference,
    ],
  );
  return result as DatabaseResult;
}

export async function fetchTransactions(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
): Promise<Transaction[]> {
  let query = 'SELECT * FROM transactions WHERE is_deleted = FALSE';
  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }
  const [rows] = await fastify.mysql.query(query);
  return (rows as any[]).map(row => normalizeRow(row)) as Transaction[];
}

export async function fetchTransactionById(fastify: FastifyInstance, id: number): Promise<Transaction | undefined> {
  const [rows] = await fastify.mysql.execute('SELECT * FROM transactions WHERE id = ? AND is_deleted = FALSE', [id]);
  const data = normalizeRow((rows as any[])[0]);
  return data as Transaction | undefined;
}

export async function fetchCountTransactions(fastify: FastifyInstance): Promise<number> {
  const [rows] = await fastify.mysql.query('SELECT COUNT(*) AS total FROM transactions WHERE is_deleted = FALSE');
  return (rows as any[])[0].total;
}

export async function putTransaction(fastify: FastifyInstance, id: number, data: any): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE transactions SET transaction_type = ?, amount = ?, currency = ?, description = ?, reference = ?, status = ? WHERE id = ?',
    [data.transaction_type, data.amount, data.currency, data.description, data.reference, data.status, id],
  );
  return (result as DatabaseResult).affectedRows > 0;
}

export async function deleteTransaction(fastify: FastifyInstance, id: number): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE transactions SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?',
    [id],
  );
  return (result as DatabaseResult).affectedRows > 0;
}
