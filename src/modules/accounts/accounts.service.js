import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  fetchAccountById,
  fetchAccounts,
  insertAccount,
  putAccount,
} from "./accounts.repository.js";

export async function getAllAccounts(fastify, limit, offset) {
  const accounts = await fetchAccounts(fastify, limit, offset);
  return accounts.map((c) => ({
    id: c.id,
    name: c.name,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
  }));
}

export async function getAccountById(fastify, id) {
  const account = await fetchAccountById(fastify, id);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No account found with id ${id}.`,
    };

  return {
    id: account.id,
    name: account.name,
    createdAt: account.created_at,
    updatedAt: account.updated_at,
  };
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
      message: `No account found with id ${accountId}.`,
    };

  const succeeded = await putAccount(fastify, accountId, name);

  if (!succeeded)
    throw {
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: `An error occurred while updating account ${accountId}.`,
    };

  return { succeeded: succeeded };
}
