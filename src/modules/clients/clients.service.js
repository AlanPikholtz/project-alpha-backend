import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  fetchClientByCode,
  fetchClientById,
  fetchClients,
  insertClient,
  putClient,
} from "./clients.repository.js";

export async function getAllClients(fastify, limit, offset) {
  const clients = await fetchClients(fastify, limit, offset);
  return clients.map((c) => ({
    id: c.id,
    firstName: c.first_name,
    lastName: c.last_name,
    code: c.code,
    balance: c.balance,
    commission: c.commission,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
    updatedBy: c.updated_by,
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
    createdAt: client.created_at,
    updatedAt: client.updated_at,
    updatedBy: client.updated_by,
  };
}

export async function createClient(
  fastify,
  firstName,
  lastName,
  code,
  balance,
  commission,
  userId
) {
  const client = await fetchClientByCode(fastify, code);

  if (client)
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.DUPLICATE_ENTRY,
      message: `This code is already registered. Please use a different code.`,
    };

  const result = await insertClient(
    fastify,
    firstName,
    lastName,
    code,
    balance,
    commission,
    userId
  );
  return { id: result.insertId };
}

export async function updateClient(
  fastify,
  clientId,
  firstName,
  lastName,
  balance,
  commission,
  userId
) {
  const client = await fetchClientById(fastify, clientId);

  if (!client)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: `No client found with id ${clientId}.`,
    };

  const succeeded = await putClient(
    fastify,
    clientId,
    firstName,
    lastName,
    balance,
    commission,
    userId
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
