import bcrypt from "bcrypt";
import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { createUser, getUserByEmail } from "./users.repository.js";

export async function registerUser(fastify, email, password) {
  const existingUser = await getUserByEmail(fastify, email);
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
  const userId = await createUser(fastify, email, hashedPassword);
  return userId;
}

export async function loginUser(fastify, email, password) {
  const user = await getUserByEmail(fastify, email);
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

  return { token: fastify.jwt.sign({ id: user.id, email: user.email }) };
}
