import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  fetchClientById,
  fetchClients,
  insertClient,
} from "./clients.repository.js";

export async function getAllClients(fastify, limit, offset) {
  const clients = await fetchClients(fastify, limit, offset);
  return clients.map((c) => ({
    id: c.id,
    name: c.name,
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
    name: client.name,
    createdAt: client.created_at,
    updatedAt: client.updated_at,
  };
}

export async function createClient(fastify, name) {
  const result = await insertClient(fastify, name);
  return { id: result.insertId };
}
