import { loginUser, registerUser } from "./users.service.js";

export async function registerHandler(req, reply) {
  try {
    req.log.info(`📝 New user registration attempt: ${req.body.email}`);
    const user = await registerUser(
      req.server,
      req.body.email,
      req.body.password
    );
    req.log.info(
      `✅ User registered successfully: ID ${user.id}, Email: ${user.email}`
    );
    return reply.status(201).send(user);
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

    const token = await loginUser(
      req.server,
      req.body.email,
      req.body.password
    );

    req.log.info(`✅ Login successful for email: ${req.body.email}`);

    return reply.send(token);
  } catch (err) {
    req.log.warn(
      `⚠️ Failed login attempt for email: ${req.body.email} - ${err.message}`
    );
    throw err;
  }
}
