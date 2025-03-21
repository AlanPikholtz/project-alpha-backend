import bcrypt from "bcrypt";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import {
  fetchUserByEmail,
  fetchUserById,
  insertUser,
} from "./auth.repository.js";

export async function registerUser(fastify, email, password) {
  const existingUser = await fetchUserByEmail(fastify, email);
  if (existingUser) {
    throw {
      isCustom: true,
      statusCode: 400,
      errorType: ERROR_TYPES.DUPLICATE_ENTRY,
      message:
        "This email is already registered. Please use a different email.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await insertUser(fastify, email, hashedPassword);
  return { id: result.insertId };
}

export async function loginUser(fastify, email, password) {
  const user = await fetchUserByEmail(fastify, email);
  if (!user)
    throw {
      isCustom: true,
      statusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
      message: "No user found with this email.",
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
    { id: user.id, email: user.email },
    { expiresIn: "2m" }
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
    { id: user.id, email: user.email },
    { expiresIn: "2m" }
  );

  const refreshToken = fastify.jwt.sign({ id: user.id }, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}
