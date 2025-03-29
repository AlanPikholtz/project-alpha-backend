import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
} from "./clients.service.js";

export async function getAllClientsHandler(req, reply) {
  try {
    var { limit = 10, offset = 0 } = req.query;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(
      `📥 Request received: GET /clients?limit=${limit}&offset=${offset}`
    );

    console.time("⏱️ GET /clients execution time");
    const clients = await getAllClients(req.server, limit, offset);
    console.timeEnd("⏱️ GET /clients execution time");

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
      lastName,
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
      lastName,
      commission,
      notes,
      accountId
    );

    req.log.info(`✅ Client updated successfully - Client id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error creating client: ${error.message}`);
    throw error;
  }
}
