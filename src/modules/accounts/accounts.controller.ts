import { FastifyReply, FastifyRequest } from 'fastify';
import { createAccount, deleteAccountById, getAccountById, getAllAccounts, updateAccount } from './accounts.service.js';

export async function getAllAccountsHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { limit = 10, page = 1 } = req.query as any;
    const offset = (page - 1) * limit;

    let limitValue: number | null = limit;
    if (limit === 0) {
      limitValue = null;
    }

    req.log.info(`📥 Request received: GET /accounts?limit=${limitValue}&page=${page}`);

    const result = await getAllAccounts(req.server, limitValue, offset, page);

    req.log.info(`✅ Accounts retrieved: ${result.total} records found`);

    return reply.send(result);
  } catch (error: any) {
    req.log.error(`❌ Error retrieving accounts: ${error.message}`);
    throw error;
  }
}

export async function getAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { id } = req.params as any;

    req.log.info(`📥 Request received: GET /accounts/${id}`);

    const account = await getAccountById(req.server, parseInt(id));

    req.log.info(`✅ Account found: ${JSON.stringify(account)}`);
    return reply.send(account);
  } catch (error: any) {
    req.log.error(`❌ Error retrieving account: ${error.message}`);
    throw error;
  }
}

export async function createAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { name } = req.body as any;

    req.log.info(`📥 Creating account: ${name}`);

    const accountId = await createAccount(req.server, name);

    req.log.info(`✅ Account created with ID: ${accountId.id}`);

    return reply.status(201).send(accountId);
  } catch (error: any) {
    req.log.error(`❌ Error creating account: ${error.message}`);
    throw error;
  }
}

export async function updateAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { id } = req.params as any;
    const { name } = req.body as any;

    req.log.info(`📥 Updating account ${id}`);

    await updateAccount(req.server, parseInt(id), name);

    req.log.info(`✅ Account updated successfully - Account id: ${id}`);

    return reply.status(204).send();
  } catch (error: any) {
    req.log.error(`❌ Error updating account: ${error.message}`);
    throw error;
  }
}

export async function deleteAccountHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    const { id } = req.params as any;

    req.log.info(`📥 Deleting account ${id}`);

    await deleteAccountById(req.server, parseInt(id));

    req.log.info(`✅ Account deleted successfully - Account id: ${id}`);

    return reply.status(204).send();
  } catch (error: any) {
    req.log.error(`❌ Error deleting account: ${error.message}`);
    throw error;
  }
}
