import { FastifyInstance } from 'fastify';
import { Payment } from '../../types/entities.js';
import { normalizeRow } from '../../utils/db.js';

interface DatabaseResult {
  insertId: number;
  affectedRows: number;
}

export async function insertPayment(fastify: FastifyInstance, data: any): Promise<DatabaseResult> {
  const [result] = await fastify.mysql.execute(
    'INSERT INTO payments (user_id, account_id, payment_method, amount, currency, description, external_reference) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      data.user_id,
      data.account_id,
      data.payment_method,
      data.amount,
      data.currency,
      data.description,
      data.external_reference,
    ],
  );
  return result as DatabaseResult;
}

export async function fetchPayments(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
): Promise<Payment[]> {
  let query = 'SELECT * FROM payments WHERE is_deleted = FALSE';
  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }
  const [rows] = await fastify.mysql.query(query);
  return (rows as any[]).map(row => normalizeRow(row)) as Payment[];
}

export async function fetchPaymentById(fastify: FastifyInstance, id: number): Promise<Payment | undefined> {
  const [rows] = await fastify.mysql.execute('SELECT * FROM payments WHERE id = ? AND is_deleted = FALSE', [id]);
  const data = normalizeRow((rows as any[])[0]);
  return data as Payment | undefined;
}

export async function fetchCountPayments(fastify: FastifyInstance): Promise<number> {
  const [rows] = await fastify.mysql.query('SELECT COUNT(*) AS total FROM payments WHERE is_deleted = FALSE');
  return (rows as any[])[0].total;
}

export async function putPayment(fastify: FastifyInstance, id: number, data: any): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE payments SET payment_method = ?, amount = ?, currency = ?, description = ?, status = ?, external_reference = ? WHERE id = ?',
    [data.payment_method, data.amount, data.currency, data.description, data.status, data.external_reference, id],
  );
  return (result as DatabaseResult).affectedRows > 0;
}

export async function deletePayment(fastify: FastifyInstance, id: number): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE payments SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?',
    [id],
  );
  return (result as DatabaseResult).affectedRows > 0;
}
