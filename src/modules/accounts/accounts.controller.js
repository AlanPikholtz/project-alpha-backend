import {
  createAccount,
  deleteAccountById,
  getAccountById,
  getAllAccounts,
  updateAccount,
} from "./accounts.service.js";

export async function getAllAccountsHandler(req, reply) {
  try {
    var { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(
      `📥 Request received: GET /accounts?limit=${limit}&page=${page}`
    );

    console.time("⏱️ GET /accounts execution time");
    const result = await getAllAccounts(req.server, limit, offset, page);
    console.timeEnd("⏱️ GET /accounts execution time");

    req.log.info(`✅ Accounts retrieved: ${result.total} records found`);

    return reply.send(result);
  } catch (error) {
    req.log.error(`❌ Error retrieving accounts: ${error.message}`);
    throw error;
  }
}

export async function getAccountHandler(req, reply) {
  try {
    const { id } = req.params;

    req.log.info(`📥 Request received: GET /accounts/${id}`);

    const account = await getAccountById(req.server, id);

    req.log.info(`✅ Account found: ${JSON.stringify(account)}`);
    return reply.send(account);
  } catch (error) {
    req.log.error(`❌ Error retrieving account: ${error.message}`);
    throw error;
  }
}

export async function createAccountHandler(req, reply) {
  try {
    const { name } = req.body;

    req.log.info(`📥 Creating account: ${name}`);

    const accountId = await createAccount(req.server, name);

    req.log.info(`✅ Account created with ID: ${accountId}`);

    return reply.status(201).send(accountId);
  } catch (error) {
    req.log.error(`❌ Error creating account: ${error.message}`);
    throw error;
  }
}

export async function updateAccountHandler(req, reply) {
  try {
    const { id } = req.params;

    const { name } = req.body;

    req.log.info(`📥 Updating account ${id}`);

    await updateAccount(req.server, id, name);

    req.log.info(`✅ Account updated successfully - Account id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error updating account: ${error.message}`);
    throw error;
  }
}

export async function deleteAccountHandler(req, reply) {
  try {
    const { id } = req.params;

    req.log.info(`📥 Deleting account ${id}`);

    await deleteAccountById(req.server, id, null);

    req.log.info(`✅ Account deleted successfully - Account id: ${id}`);

    return reply.status(204).send();
  } catch (error) {
    req.log.error(`❌ Error deleting account: ${error.message}`);
    throw error;
  }
}
