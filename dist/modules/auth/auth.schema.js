import { AuthTokensResponseSchema, LoginBodySchema, RefreshBodySchema, RegisterBodySchema, RegisterResponseSchema } from '../../types/schemas.js';
export const registerSchema = {
    description: "Register a new user in the system.",
    summary: "User registration",
    tags: ["Auth"],
    body: RegisterBodySchema,
    response: {
        201: RegisterResponseSchema,
    },
};
export const loginSchema = {
    description: "Authenticate a user and return JWT tokens for session management.",
    summary: "User login",
    tags: ["Auth"],
    body: LoginBodySchema,
    response: {
        200: AuthTokensResponseSchema,
    },
};
export const refreshSchema = {
    description: "Generates and return new JWT tokens for session management.",
    summary: "Refresh token",
    tags: ["Auth"],
    body: RefreshBodySchema,
    response: {
        200: AuthTokensResponseSchema,
    },
};
