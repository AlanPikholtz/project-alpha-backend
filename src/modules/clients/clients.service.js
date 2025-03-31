import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  fetchClientByCode,
  fetchClientById,
  fetchClients,
  insertClient,
  putClient,
} from "./clients.repository.js";

import { fetchAccountById } from "../accounts/accounts.repository.js";

export async function getAllClients(fastify, limit, offset) {
  const clients = await fetchClients(fastify, limit, offset);
  return clients.map((c) => ({
    id: c.id,
    firstName: c.first_name,
    lastName: c.last_name,
    code: c.code,
    balance: c.balance,
    commission: c.commission,
    notes: c.notes,
    accountId: c.account_id,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
  }));
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

  return {
    id: client.id,
    firstName: client.first_name,
    lastName: client.last_name,
    code: client.code,
    balance: client.balance,
    commission: client.commission,
    notes: client.notes,
    accountId: client.account_id,
    createdAt: client.created_at,
    updatedAt: client.updated_at,
  };
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
