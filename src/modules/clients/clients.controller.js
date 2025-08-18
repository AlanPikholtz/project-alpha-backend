import { DateTime } from "luxon";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { normalizeResponse } from "../../utils/response.js";
import {
  createClient,
  deleteClientById,
  getAllClients,
  getClientById,
  getClientOperations,
  updateClient,
  updateClientBalance,
} from "./clients.service.js";

export async function getAllClientsHandler(req, reply) {
  try {
    var { limit = 10, page = 1, accountId } = req.query;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(
      `📥 Request received: GET /clients?limit=${limit}&page=${page}&accountId=${accountId}`
    );

    const clients = await getAllClients(
      req.server,
      limit,
      offset,
      page,
      accountId
    );

    req.log.info(`✅ Clients retrieved: ${clients.length} records found`);

    return reply.send(clients);
  } catch (error) {
    req.log.error(`❌ Error retrieving clients: ${error.message}`);
    throw error;
  }
}

export async function getClientHandler(req, reply) {
  try {
    const { id } = req.params;

    req.log.info(`📥 Request received: GET /clients/${id}`);

    const client = await getClientById(req.server, id);

    req.log.info(`✅ Client found: ${JSON.stringify(client)}`);
    return reply.send(client);
  } catch (error) {
    req.log.error(`❌ Error retrieving client: ${error.message}`);
    throw error;
  }
}

export async function createClientHandler(req, reply) {
  try {
    const { firstName, lastName, code, balance, commission, notes, accountId } =
      req.body;

    req.log.info(
      `📥 Creating client: ${firstName} ${lastName} - code: ${code}`
    );

    const clientId = await createClient(
      req.server,
      firstName,
      lastName ?? null,
      code,
      balance,
      commission ?? null,
      notes ?? null,
      accountId
    );

    req.log.info(`✅ Client created with ID: ${clientId}`);

    return reply.status(201).send(clientId);
  } catch (error) {
    req.log.error(`❌ Error creating client: ${error.message}`);
    throw error;
  }
}

export async function updateClientHandler(req, reply) {
  try {
    const { id } = req.params;

    const { firstName, lastName, commission, notes, accountId } = req.body;

    req.log.info(`📥 Updating client ${id}`);

    await updateClient(
      req.server,
      id,
      firstName,
      lastName ?? null,
      commission,
      notes,
      accountId
    );

    req.log.info(`✅ Client updated successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error updating client: ${error.message}`);
    throw error;
  }
}

export async function updateClientBalanceHandler(req, reply) {
  try {
    const { id } = req.params;

    const { balance } = req.body;

    req.log.info(`📥 Updating client ${id} balance`);

    await updateClientBalance(req.server, id, balance);

    req.log.info(`✅ Client balance updated successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error updating client balance: ${error.message}`);
    throw error;
  }
}

export async function getClientOperationsHandler(req, reply) {
  try {
    const { id } = req.params;

    var {
      limit = 10,
      page = 1,
      from,
      to,
      sort = "assignedAt",
      order = "desc",
      type = "all",
    } = req.query;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    if (from && to) {
      const fromDate = DateTime.fromISO(from, { setZone: true }).toUTC();
      const toDate = DateTime.fromISO(to, { setZone: true }).toUTC();

      if (fromDate > toDate) {
        throw {
          isCustom: true,
          statusCode: 400,
          errorType: ERROR_TYPES.BAD_REQUEST,
          message: '"from" no puede ser mayor que "to"',
        };
      }
    }

    req.log.info(
      `📥 Request received: GET /client/${id}/operations?limit=${limit}&page=${page}&from=${from}&to=${to}&sort=${sort}&order=${order}`
    );

    const operations = await getClientOperations(
      req.server,
      id,
      limit,
      offset,
      from,
      to,
      sort,
      order,
      page,
      type
    );

    req.log.info(`✅ Operations retrieved: ${operations.length} records found`);
    const normalizedOperations = normalizeResponse(operations);
    return reply.send(normalizedOperations);
  } catch (error) {
    req.log.error(`❌ Error retrieving operations: ${error.message}`);
    throw error;
  }
}

export async function deleteClientHandler(req, reply) {
  try {
    const { id } = req.params;

    req.log.info(`📥 Deleting client ${id}`);

    await deleteClientById(req.server, id);

    req.log.info(`✅ Client deleted successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error deleting client: ${error.message}`);
    throw error;
  }
}
