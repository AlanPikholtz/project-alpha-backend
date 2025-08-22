import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginBody, RefreshBody, RegisterBody } from '../../types/schemas.js';
import { loginUser, refreshTokens, registerUser } from './auth.service.js';

export async function registerHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    req.log.info(`📝 New user registration attempt: ${(req.body as RegisterBody).username}`);

    const body = req.body as RegisterBody;
    const userId = await registerUser(req.server, body.username, body.password);

    req.log.info(`✅ User registered successfully: ID ${userId.id}, Username: ${(req.body as RegisterBody).username}`);

    return reply.status(201).send(userId);
  } catch (err: any) {
    req.log.error(`❌ Registration failed for username: ${(req.body as RegisterBody).username} - ${err.message}`);

    throw err;
  }
}

export async function loginHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    req.log.info(`🔑 Login attempt for username: ${(req.body as LoginBody).username}`);

    const body = req.body as LoginBody;
    const tokens = await loginUser(req.server, body.username, body.password);

    req.log.info(`✅ Login successful for username: ${(req.body as LoginBody).username}`);

    return reply.send(tokens);
  } catch (err: any) {
    req.log.warn(`⚠️ Failed login attempt for username: ${(req.body as LoginBody).username} - ${err.message}`);

    throw err;
  }
}

export async function refreshHandler(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  try {
    req.log.info(`🔑 Refresh tokens attempt with token: ${(req.body as RefreshBody).refreshToken}`);

    const tokens = await refreshTokens(req.server, (req.body as RefreshBody).refreshToken);

    req.log.info(`✅ Token refresh successful for token: ${(req.body as RefreshBody).refreshToken}`);

    return reply.send(tokens);
  } catch (err: any) {
    req.log.warn(`⚠️ Failed refresh token attempt - ${err.message}`);

    throw err;
  }
}
