import { ERROR_TYPES } from "../constants/errorTypes.js";

export default function errorHandler(error, req, reply) {
  let statusCode = error.statusCode || 500;
  let errorType = error.name || ERROR_TYPES.INTERNAL_SERVER_ERROR;
  let messages = [];

  if (error.validation) {
    statusCode = 400;
    errorType = ERROR_TYPES.VALIDATION_ERROR;
    messages = error.validation.map((err) => err.message);
  } else if (error.isCustom) {
    statusCode = error.statusCode || 400;
    errorType = error.errorType || ERROR_TYPES.INTERNAL_SERVER_ERROR;
    messages = Array.isArray(error.message) ? error.message : [error.message];
  } else {
    statusCode = 500;
    errorType = ERROR_TYPES.INTERNAL_SERVER_ERROR;
    messages = [
      "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    ];
    console.error("❌ Error inesperado:", error);
  }

  return reply.status(statusCode).send({
    statusCode,
    error: errorType,
    messages,
  });
}
