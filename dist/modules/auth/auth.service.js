import bcrypt from "bcrypt";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchUserById, fetchUserByUsername, insertUser, } from "./auth.repository.js";
export async function registerUser(fastify, username, password) {
    const existingUser = await fetchUserByUsername(fastify, username);
    if (existingUser) {
        const error = {
            name: "CustomError",
            message: "El usuario ya está registrado. Por favor, utiliza un nombre de usuario diferente.",
            isCustom: true,
            statusCode: 400,
            errorType: ERROR_TYPES.DUPLICATE_ENTRY,
        };
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insertUser(fastify, username, hashedPassword);
    return { id: result.insertId };
}
export async function loginUser(fastify, username, password) {
    const user = await fetchUserByUsername(fastify, username);
    if (!user) {
        const error = {
            name: "CustomError",
            message: "No se encontró usuario con este nombre de usuario.",
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        const error = {
            name: "CustomError",
            message: "Contraseña incorrecta.",
            isCustom: true,
            statusCode: 401,
            errorType: ERROR_TYPES.UNAUTHORIZED,
        };
        throw error;
    }
    const accessTokenPayload = {
        id: user.id,
        username: user.username
    };
    const refreshTokenPayload = {
        id: user.id
    };
    const accessToken = fastify.jwt.sign(accessTokenPayload, { expiresIn: "3h" });
    const refreshToken = fastify.jwt.sign(refreshTokenPayload, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}
export async function refreshTokens(fastify, token) {
    let userId;
    try {
        const decoded = fastify.jwt.verify(token);
        if (!decoded.id) {
            const error = {
                name: "CustomError",
                message: "Token inválido.",
                isCustom: true,
                statusCode: 401,
                errorType: ERROR_TYPES.UNAUTHORIZED,
            };
            throw error;
        }
        userId = decoded.id;
    }
    catch (error) {
        const customError = {
            name: "CustomError",
            message: "Token incorrecto o no existente.",
            isCustom: true,
            statusCode: 401,
            errorType: ERROR_TYPES.UNAUTHORIZED,
        };
        throw customError;
    }
    const user = await fetchUserById(fastify, userId);
    if (!user) {
        const error = {
            name: "CustomError",
            message: "No se encontró usuario vinculado al token.",
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const accessTokenPayload = {
        id: user.id,
        username: user.username
    };
    const refreshTokenPayload = {
        id: user.id
    };
    const accessToken = fastify.jwt.sign(accessTokenPayload, { expiresIn: "3h" });
    const refreshToken = fastify.jwt.sign(refreshTokenPayload, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}
