import { FastifyInstance } from 'fastify';
import { User } from '../../types/entities.js';

interface DatabaseResult {
  insertId: number;
  affectedRows: number;
}

export async function fetchUserByUsername(fastify: FastifyInstance, username: string): Promise<User | undefined> {
  const [rows] = await fastify.mysql.execute('SELECT * FROM users WHERE username = ?', [username]);
  return (rows as User[])[0];
}

export async function fetchUserById(fastify: FastifyInstance, id: number): Promise<User | undefined> {
  const [rows] = await fastify.mysql.execute('SELECT * FROM users WHERE id = ?', [id]);
  return (rows as User[])[0];
}

export async function insertUser(
  fastify: FastifyInstance,
  username: string,
  password: string,
): Promise<DatabaseResult> {
  const [result] = await fastify.mysql.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
    username,
    password,
  ]);
  return result as DatabaseResult;
}
