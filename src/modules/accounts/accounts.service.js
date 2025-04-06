import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
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
      message: `No account found with id ${id}.`,
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
