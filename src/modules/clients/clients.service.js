import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  fetchClientByCode,
  fetchClientById,
  fetchClients,
  fetchCountClients,
  insertClient,
  putClient,
} from "./clients.repository.js";

import { fetchAccountById } from "../accounts/accounts.repository.js";

export async function getAllClients(fastify, limit, offset, page) {
  const clients = await fetchClients(fastify, limit, offset);
  const totalClients = await fetchCountClients(fastify);
  const totalPages = !limit ? 1 : Math.ceil(totalClients / limit);

  return {
    data: clients,
    total: totalClients,
    page: page,
    pages: totalPages,
    limit: limit ?? 0,
  };
}

export async function getClientById(fastify, id) {
  const client = await fetchClientById(fastify, id);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No client found with id ${id}.`,
    };

  return client;
}

export async function createClient(
  fastify,
  firstName,
  lastName,
  code,
  balance,
  commission,
  notes,
  accountId
) {
  const client = await fetchClientByCode(fastify, code);

  if (client)
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.DUPLICATE_ENTRY,
      message: `This code is already registered. Please use a different code.`,
    };

  const account = await fetchAccountById(fastify, accountId);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No account found with id ${accountId}.`,
    };

  const result = await insertClient(
    fastify,
    firstName,
    lastName,
    code,
    balance,
    commission,
    notes,
    accountId
  );
  return { id: result.insertId };
}

export async function updateClient(
  fastify,
  clientId,
  firstName,
  lastName,
  commission,
  notes,
  accountId
) {
  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No client found with id ${clientId}.`,
    };

  const account = await fetchAccountById(fastify, accountId);

  if (!account)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No account found with id ${accountId}.`,
    };

  const succeeded = await putClient(
    fastify,
    clientId,
    firstName,
    lastName,
    commission,
    notes,
    accountId
  );

  if (!succeeded)
    throw {
      isCustom: true,
      statusCode: 500,
      errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: `An error occurred while updating client ${clientId}.`,
    };

  return { succeeded: succeeded };
}
