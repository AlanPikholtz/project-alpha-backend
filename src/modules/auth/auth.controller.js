import { loginUser, refreshTokens, registerUser } from "./auth.service.js";

export async function registerHandler(req, reply) {
  try {
    req.log.info(`📝 New user registration attempt: ${req.body.email}`);

    const userId = await registerUser(
      req.server,
      req.body.email,
      req.body.password
    );

    req.log.info(
      `✅ User registered successfully: ID ${userId}, Email: ${req.body.email}`
    );

    return reply.status(201).send(userId);
  } catch (err) {
    req.log.error(
      `❌ Registration failed for email: ${req.body.email} - ${err.message}`
    );

    throw err;
  }
}

export async function loginHandler(req, reply) {
  try {
    req.log.info(`🔑 Login attempt for email: ${req.body.email}`);

    const tokens = await loginUser(
      req.server,
      req.body.email,
      req.body.password
    );

    req.log.info(`✅ Login successful for email: ${req.body.email}`);

    return reply.send(tokens);
  } catch (err) {
    req.log.warn(
      `⚠️ Failed login attempt for email: ${req.body.email} - ${err.message}`
    );

    throw err;
  }
}

export async function refreshHandler(req, reply) {
  try {
    req.log.info(
      `🔑 Refresh tokens attempt with token: ${req.body.refreshToken}`
    );

    const tokens = await refreshTokens(req.server, req.body.refreshToken);

    req.log.info(
      `✅ Token refresh successful for token: ${req.body.refreshToken}`
    );

    return reply.send(tokens);
  } catch (err) {
    req.log.warn(`⚠️ Failed refresh token attempt - ${err.message}`);

    throw err;
  }
}
