import { loginUser, refreshTokens, registerUser } from "./auth.service.js";
export async function registerHandler(req, reply) {
    try {
        req.log.info(`📝 New user registration attempt: ${req.body.username}`);
        const body = req.body;
        const userId = await registerUser(req.server, body.username, body.password);
        req.log.info(`✅ User registered successfully: ID ${userId.id}, Username: ${req.body.username}`);
        return reply.status(201).send(userId);
    }
    catch (err) {
        req.log.error(`❌ Registration failed for username: ${req.body.username} - ${err.message}`);
        throw err;
    }
}
export async function loginHandler(req, reply) {
    try {
        req.log.info(`🔑 Login attempt for username: ${req.body.username}`);
        const body = req.body;
        const tokens = await loginUser(req.server, body.username, body.password);
        req.log.info(`✅ Login successful for username: ${req.body.username}`);
        return reply.send(tokens);
    }
    catch (err) {
        req.log.warn(`⚠️ Failed login attempt for username: ${req.body.username} - ${err.message}`);
        throw err;
    }
}
export async function refreshHandler(req, reply) {
    try {
        req.log.info(`🔑 Refresh tokens attempt with token: ${req.body.refreshToken}`);
        const tokens = await refreshTokens(req.server, req.body.refreshToken);
        req.log.info(`✅ Token refresh successful for token: ${req.body.refreshToken}`);
        return reply.send(tokens);
    }
    catch (err) {
        req.log.warn(`⚠️ Failed refresh token attempt - ${err.message}`);
        throw err;
    }
}
