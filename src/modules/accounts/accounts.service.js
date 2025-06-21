import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  deleteAccount,
  fetchAccountById,
  fetchAccounts,
  fetchCountAccounts,
  insertAccount,
  putAccount,
} from "./accounts.repository.js";

export async function getAllAccounts(fastify, limit, offset, page) {
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

export async function getAccountById(fastify, id) {
  const account = await fetchAccountById(fastify, id);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cuenta con id ${id}.`,
    };

  return account;
}

export async function createAccount(fastify, name) {
  const result = await insertAccount(fastify, name);
  return { id: result.insertId };
}

export async function updateAccount(fastify, accountId, name) {
  const account = await fetchAccountById(fastify, accountId);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cuenta con id ${accountId}.`,
    };

  const succeeded = await putAccount(fastify, accountId, name);

  if (!succeeded)
    throw {
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: `Ocurrió un error al actualizar la cuenta ${accountId}.`,
    };

  return { succeeded: succeeded };
}

export async function deleteAccountById(fastify, accountId) {
  const account = await fetchAccountById(fastify, accountId);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No se encontró cuenta con id ${accountId}.`,
    };

  const succeeded = await deleteAccount(fastify, accountId);

  if (!succeeded)
    throw {
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: `Ocurrió un error al eliminar la cuenta ${accountId}.`,
    };

  return { succeeded: succeeded };
}
