import {
  createAccount,
  getAccountById,
  getAllAccounts,
} from "./accounts.service.js";

export async function getAllAccountsHandler(req, reply) {
  try {
    var { limit = 10, offset = 0 } = req.query;

    if (limit === 0) {
      limit = null;
    }

    req.log.info(
      `📥 Request received: GET /accounts?limit=${limit}&offset=${offset}`
    );

    console.time("⏱️ GET /accounts execution time");
    const accounts = await getAllAccounts(req.server, limit, offset);
    console.timeEnd("⏱️ GET /accounts execution time");

    req.log.info(`✅ Accounts retrieved: ${accounts.length} records found`);

    return reply.send(accounts);
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
