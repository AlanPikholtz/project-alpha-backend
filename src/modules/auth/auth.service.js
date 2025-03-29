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
        "This username is already registered. Please use a different username.",
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
      message: "No user found with this username.",
    };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    throw {
      isCustom: true,
      statusCode: 401,
      errorType: ERROR_TYPES.UNAUTHORIZED,
      message: "Incorrect credentials.",
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
      message: "Invalid refresh token",
    };

  const user = await fetchUserById(fastify, decoded.id);
  if (!user)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: "No user found with this id.",
    };

  const accessToken = fastify.jwt.sign(
    { id: user.id, username: user.username },
    { expiresIn: "3h" }
  );

  const refreshToken = fastify.jwt.sign({ id: user.id }, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}
