import { FastifyInstance } from 'fastify';
import { ERROR_TYPES } from '../../constants/errorTypes.js';
import { CustomError } from '../../types/errors.js';
import { TransactionsResponse } from '../../types/transactions.js';
import {
  deleteTransaction,
  fetchCountTransactions,
  fetchTransactionById,
  fetchTransactions,
  insertTransaction,
  putTransaction,
} from './transactions.repository.js';

export async function getAllTransactions(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
  page: number,
): Promise<TransactionsResponse> {
  const transactions = await fetchTransactions(fastify, limit, offset);
  const totalTransactions = await fetchCountTransactions(fastify);
  const totalPages = !limit ? 1 : Math.ceil(totalTransactions / limit);

  return {
    data: transactions,
    total: totalTransactions,
    page: page,
    pages: totalPages,
    limit: limit ?? 0,
  };
}

export async function getTransactionById(fastify: FastifyInstance, id: number) {
  const transaction = await fetchTransactionById(fastify, id);

  if (!transaction) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró transacción con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  return transaction;
}

export async function createTransaction(fastify: FastifyInstance, data: any): Promise<{ id: number }> {
  const result = await insertTransaction(fastify, data);
  return { id: result.insertId };
}

export async function updateTransaction(
  fastify: FastifyInstance,
  id: number,
  data: any,
): Promise<{ succeeded: boolean }> {
  const transaction = await fetchTransactionById(fastify, id);

  if (!transaction) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró transacción con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await putTransaction(fastify, id, data);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al actualizar la transacción ${id}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded };
}

export async function deleteTransactionById(fastify: FastifyInstance, id: number): Promise<{ succeeded: boolean }> {
  const transaction = await fetchTransactionById(fastify, id);

  if (!transaction) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró transacción con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await deleteTransaction(fastify, id);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al eliminar la transacción ${id}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded };
}
