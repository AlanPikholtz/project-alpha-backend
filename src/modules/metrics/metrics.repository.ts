import { FastifyInstance } from 'fastify';
import { Metric } from '../../types/entities.js';
import { normalizeRow } from '../../utils/db.js';

interface DatabaseResult {
  insertId: number;
  affectedRows: number;
}

export async function insertMetric(fastify: FastifyInstance, data: any): Promise<DatabaseResult> {
  const [result] = await fastify.mysql.execute(
    'INSERT INTO metrics (user_id, metric_type, metric_value, metric_date, description) VALUES (?, ?, ?, ?, ?)',
    [data.user_id, data.metric_type, data.metric_value, data.metric_date, data.description],
  );
  return result as DatabaseResult;
}

export async function fetchMetrics(fastify: FastifyInstance, limit: number | null, offset: number): Promise<Metric[]> {
  let query = 'SELECT * FROM metrics';
  if (limit !== null) {
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }
  const [rows] = await fastify.mysql.query(query);
  return (rows as any[]).map(row => normalizeRow(row)) as Metric[];
}

export async function fetchMetricById(fastify: FastifyInstance, id: number): Promise<Metric | undefined> {
  const [rows] = await fastify.mysql.execute('SELECT * FROM metrics WHERE id = ?', [id]);
  const data = normalizeRow((rows as any[])[0]);
  return data as Metric | undefined;
}

export async function fetchCountMetrics(fastify: FastifyInstance): Promise<number> {
  const [rows] = await fastify.mysql.query('SELECT COUNT(*) AS total FROM metrics');
  return (rows as any[])[0].total;
}

export async function putMetric(fastify: FastifyInstance, id: number, data: any): Promise<boolean> {
  const [result] = await fastify.mysql.execute(
    'UPDATE metrics SET metric_type = ?, metric_value = ?, metric_date = ?, description = ? WHERE id = ?',
    [data.metric_type, data.metric_value, data.metric_date, data.description, id],
  );
  return (result as DatabaseResult).affectedRows > 0;
}

export async function deleteMetric(fastify: FastifyInstance, id: number): Promise<boolean> {
  const [result] = await fastify.mysql.execute('DELETE FROM metrics WHERE id = ?', [id]);
  return (result as DatabaseResult).affectedRows > 0;
}
