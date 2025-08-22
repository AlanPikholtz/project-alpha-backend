import { FastifyInstance } from 'fastify';
import { Client } from '../../types/entities.js';
import { normalizeRow } from '../../utils/db.js';

interface DatabaseResult {
  insertId: number;
  affectedRows: number;
}

export async function insertClient(
  fastify: FastifyInstance,
  firstName: string,
  lastName: string | null,
  code: string,
  balance: string,
  commission: string | null,
  notes: string | null,
  accountId: number,
): Promise<DatabaseResult> {
  const [result] = await fastify.mysql.execute(
    'INSERT INTO clients (first_name, last_name, code, balance, commission, notes, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, code, balance, commission, notes, accountId],
  );
  return result as DatabaseResult;
}

export async function fetchClients(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
  accountId?: number,
): Promise<Client[]> {
  let query = 'SELECT * FROM clients';
  const conditions = [];
  const params: any[] = [];

  if (accountId) {
    conditions.push('account_id = ?');
    params.push(accountId);
  }

  conditions.push('is_deleted = FALSE');

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  const [rows] = await fastify.mysql.query(query, params);

  const data = (rows as any[]).map(row => normalizeRow(row));
  return data as Client[];
}

export async function fetchCountClients(fastify: FastifyInstance, accountId?: number): Promise<number> {
  let query = 'SELECT COUNT(*) AS total FROM clients';
  const conditions = [];
  const params: any[] = [];

  if (accountId) {
    conditions.push('account_id = ?');
    params.push(accountId);
  }

  conditions.push('is_deleted = FALSE');

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  const [rows] = await fastify.mysql.execute(query, params);

  return (rows as any[])[0].total;
}

export async function fetchClientById(
  fastify: FastifyInstance,
  id: number,
  withDeleted = false,
): Promise<Client | undefined> {
  let query = 'SELECT * FROM clients';
  const conditions = [];
  const params: any[] = [];

  if (!withDeleted) {
    conditions.push('is_deleted = FALSE');
  }

  conditions.push('id = ?');
  params.push(id);

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  const [rows] = await fastify.mysql.execute(query, params);

  const data = normalizeRow((rows as any[])[0]);
  return data as Client | undefined;
}

export async function fetchClientByCode(fastify: FastifyInstance, code: string): Promise<Client | undefined> {
  const [rows] = await fastify.mysql.query('SELECT * FROM clients WHERE code = ? AND is_deleted = FALSE', [code]);
  const data = normalizeRow((rows as any[])[0]);
  return data as Client | undefined;
}

export async function putClient(
  fastify: FastifyInstance,
  clientId: number,
  firstName: string,
  lastName: string | null,
  commission: string,
  notes: string | null,
  accountId: number,
): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE clients SET first_name = ?, last_name = ?, commission = ?, notes = ?, account_id = ? WHERE id = ?',
    [firstName, lastName, commission, notes, accountId, clientId],
  );
  return (result as DatabaseResult).affectedRows != 0;
}

export async function putClientBalance(fastify: FastifyInstance, clientId: number, balance: string): Promise<boolean> {
  const [result] = await fastify.mysql.execute('UPDATE clients SET balance = ? WHERE id = ?', [balance, clientId]);
  return (result as DatabaseResult).affectedRows != 0;
}

export async function deleteClient(fastify: FastifyInstance, clientId: number): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE clients SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?',
    [clientId],
  );
  return (result as DatabaseResult).affectedRows > 0;
}

// Simplified operations functions - in a real app you'd implement the full complex logic
export async function fetchClientOperations(
  fastify: FastifyInstance,
  clientId: number,
  limit: number | null,
  offset: number,
  from?: string,
  to?: string,
  sort?: string,
  order?: string,
  type?: string,
): Promise<any[]> {
  // Simplified implementation - you would implement the full logic here
  return [];
}

export async function fetchCountOperations(
  fastify: FastifyInstance,
  clientId: number,
  from?: string,
  to?: string,
  type?: string,
): Promise<number> {
  // Simplified implementation
  return 0;
}
