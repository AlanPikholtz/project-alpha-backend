import { FastifyInstance } from 'fastify';
import { Account } from '../../types/entities.js';
import { normalizeRow } from '../../utils/db.js';

interface DatabaseResult {
  insertId: number;
  affectedRows: number;
}

export async function insertAccount(fastify: FastifyInstance, name: string): Promise<DatabaseResult> {
  const [result] = await fastify.mysql.query('INSERT INTO accounts (name) VALUES (?)', [name]);
  return result as DatabaseResult;
}

export async function fetchAccounts(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
): Promise<Account[]> {
  let query = 'SELECT * FROM accounts WHERE is_deleted = FALSE';

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query);

  const data = (rows as any[]).map(row => normalizeRow(row));
  return data as Account[];
}

export async function fetchCountAccounts(fastify: FastifyInstance): Promise<number> {
  const query = 'SELECT COUNT(*) AS total FROM accounts WHERE is_deleted = FALSE';

  const [rows] = await fastify.mysql.query(query);

  return (rows as any[])[0].total;
}

export async function fetchAccountById(fastify: FastifyInstance, id: number): Promise<Account | undefined> {
  const [rows] = await fastify.mysql.query('SELECT * FROM accounts WHERE id = ? AND is_deleted = FALSE', [id]);
  const data = normalizeRow((rows as any[])[0]);
  return data as Account | undefined;
}

export async function putAccount(fastify: FastifyInstance, id: number, name: string): Promise<boolean> {
  const [result] = await fastify.mysql.execute('UPDATE accounts SET name = ? WHERE id = ?', [name, id]);
  return (result as DatabaseResult).affectedRows != 0;
}

export async function deleteAccount(fastify: FastifyInstance, id: number): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE accounts SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?',
    [id],
  );
  return (result as DatabaseResult).affectedRows != 0;
}
