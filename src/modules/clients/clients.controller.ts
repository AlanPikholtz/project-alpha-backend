import { FastifyReply, FastifyRequest } from 'fastify';
import { normalizeResponse } from '../../utils/response.js';
import {
  createClient,
  deleteClientById,
  getAllClients,
  getClientById,
  getClientOperations,
  updateClient,
  updateClientBalance,
} from './clients.service.js';

export async function getAllClientsHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    let { limit = 10, page = 1, accountId } = req.query as any;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(`📥 Request received: GET /clients?limit=${limit}&page=${page}&accountId=${accountId}`);

    const clients = await getAllClients(req.server, limit, offset, page, accountId);

    req.log.info(`✅ Clients retrieved: ${clients.data.length} records found`);

    return reply.send(clients);
  } catch (error: any) {
    req.log.error(`❌ Error retrieving clients: ${error.message}`);
    throw error;
  }
}

export async function getClientHandler(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = req.params as any;

    req.log.info(`📥 Request received: GET /clients/${id}`);

    const client = await getClientById(req.server, parseInt(id));

    req.log.info(`✅ Client found: ${JSON.stringify(client)}`);
    return reply.send(client);
  } catch (error: any) {
    req.log.error(`❌ Error retrieving client: ${error.message}`);
    throw error;
  }
}

export async function createClientHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { firstName, lastName, code, balance, commission, notes, accountId } = req.body as any;

    req.log.info(`📥 Creating client: ${firstName} ${lastName} - code: ${code}`);

    const clientId = await createClient(
      req.server,
      firstName,
      lastName ?? null,
      code,
      balance,
      commission ?? null,
      notes ?? null,
      accountId,
    );

    req.log.info(`✅ Client created with ID: ${clientId}`);

    return reply.status(201).send(clientId);
  } catch (error: any) {
    req.log.error(`❌ Error creating client: ${error.message}`);
    throw error;
  }
}

export async function updateClientHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    const { firstName, lastName, commission, notes, accountId } = req.body as any;

    req.log.info(`📥 Updating client ${id}`);

    await updateClient(req.server, parseInt(id), firstName, lastName ?? null, commission, notes, accountId);

    req.log.info(`✅ Client updated successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error: any) {
    req.log.error(`❌ Error updating client: ${error.message}`);
    throw error;
  }
}

export async function updateClientBalanceHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    const { balance } = req.body as any;

    req.log.info(`📥 Updating client ${id} balance`);

    await updateClientBalance(req.server, parseInt(id), balance);

    req.log.info(`✅ Client balance updated successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error: any) {
    req.log.error(`❌ Error updating client balance: ${error.message}`);
    throw error;
  }
}

export async function deleteClientHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;

    req.log.info(`📥 Deleting client ${id}`);

    await deleteClientById(req.server, parseInt(id));

    req.log.info(`✅ Client deleted successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error: any) {
    req.log.error(`❌ Error deleting client: ${error.message}`);
    throw error;
  }
}

export async function getClientOperationsHandler(req: FastifyRequest<any>, reply: FastifyReply) {
  try {
    const { id } = req.params as any;
    let { limit = 10, page = 1, from, to, sort = 'assignedAt', order = 'desc', type = 'all' } = req.query as any;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(`📥 Request received: GET /client/${id}/operations`);

    const operations = await getClientOperations(
      req.server,
      parseInt(id),
      limit,
      offset,
      from,
      to,
      sort,
      order,
      page,
      type,
    );

    req.log.info(`✅ Operations retrieved: ${operations.data.length} records found`);
    const normalizedOperations = normalizeResponse(operations);
    return reply.send(normalizedOperations);
  } catch (error: any) {
    req.log.error(`❌ Error retrieving operations: ${error.message}`);
    throw error;
  }
}
