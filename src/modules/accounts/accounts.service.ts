import { FastifyInstance } from 'fastify';
import { ERROR_TYPES } from '../../constants/errorTypes.js';
import { AccountsResponse } from '../../types/accounts.js';
import { CustomError } from '../../types/errors.js';
import {
  deleteAccount,
  fetchAccountById,
  fetchAccounts,
  fetchCountAccounts,
  insertAccount,
  putAccount,
} from './accounts.repository.js';

export async function getAllAccounts(
  fastify: FastifyInstance,
  limit: number | null,
  offset: number,
  page: number,
): Promise<AccountsResponse> {
  const accounts = await fetchAccounts(fastify, limit, offset);
  const totalAccounts = await fetchCountAccounts(fastify);
  const totalPages = !limit ? 1 : Math.ceil(totalAccounts / limit);

  return {
    data: accounts,
    total: totalAccounts,
    page: page,
    pages: totalPages,
    limit: limit ?? 0,
  };
}

export async function getAccountById(fastify: FastifyInstance, id: number) {
  const account = await fetchAccountById(fastify, id);

  if (!account) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró cuenta con id ${id}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  return account;
}

export async function createAccount(fastify: FastifyInstance, name: string): Promise<{ id: number }> {
  const result = await insertAccount(fastify, name);
  return { id: result.insertId };
}

export async function updateAccount(
  fastify: FastifyInstance,
  accountId: number,
  name: string,
): Promise<{ succeeded: boolean }> {
  const account = await fetchAccountById(fastify, accountId);

  if (!account) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró cuenta con id ${accountId}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await putAccount(fastify, accountId, name);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al actualizar la cuenta ${accountId}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded: succeeded };
}

export async function deleteAccountById(fastify: FastifyInstance, accountId: number): Promise<{ succeeded: boolean }> {
  const account = await fetchAccountById(fastify, accountId);

  if (!account) {
    const error: CustomError = {
      name: 'CustomError',
      message: `No se encontró cuenta con id ${accountId}.`,
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    };
    throw error;
  }

  const succeeded = await deleteAccount(fastify, accountId);

  if (!succeeded) {
    const error: CustomError = {
      name: 'CustomError',
      message: `Ocurrió un error al eliminar la cuenta ${accountId}.`,
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    };
    throw error;
  }

  return { succeeded: succeeded };
}
