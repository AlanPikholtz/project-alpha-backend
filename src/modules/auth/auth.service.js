import bcrypt from "bcrypt";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  fetchUserById,
  fetchUserByUsername,
  insertUser,
} from "./auth.repository.js";

export async function registerUser(fastify, username, password) {
  const existingUser = await fetchUserByUsername(fastify, username);
  if (existingUser) {
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.DUPLICATE_ENTRY,
      message:
        "El usuario ya está registrado. Por favor, utiliza un nombre de usuario diferente.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await insertUser(fastify, username, hashedPassword);
  return { id: result.insertId };
}

export async function loginUser(fastify, username, password) {
  const user = await fetchUserByUsername(fastify, username);
  if (!user)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: "No se encontró usuario con este nombre de usuario.",
    };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    throw {
      isCustom: true,
      statusCode: 401,
      errorType: ERROR_TYPES.UNAUTHORIZED,
      message: "Contraseña incorrecta.",
    };

  const accessToken = fastify.jwt.sign(
    { id: user.id, username: user.username },
    { expiresIn: "3h" }
  );

  const refreshToken = fastify.jwt.sign({ id: user.id }, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}

export async function refreshTokens(fastify, token) {
  const decoded = fastify.jwt.verify(token);
  if (!decoded.id)
    throw {
      isCustom: true,
      statusCode: 401,
      errorType: ERROR_TYPES.UNAUTHORIZED,
      message: "Token inválido.",
    };

  const user = await fetchUserById(fastify, decoded.id);
  if (!user)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: "No se encontró usuario vinculado al token.",
    };

  const accessToken = fastify.jwt.sign(
    { id: user.id, username: user.username },
    { expiresIn: "3h" }
  );

  const refreshToken = fastify.jwt.sign({ id: user.id }, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}
