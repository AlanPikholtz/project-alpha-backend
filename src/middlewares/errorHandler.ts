import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ERROR_TYPES, ErrorType } from '../constants/errorTypes.js';
import { CustomError } from '../types/errors.js';

interface ValidationError extends Error {
  validation: Array<{ message?: string }>;
  statusCode?: number;
}

export default function errorHandler(
  error: FastifyError | ValidationError | CustomError | Error,
  req: FastifyRequest,
  reply: FastifyReply,
): FastifyReply {
  let statusCode = 500;
  let errorType: ErrorType = ERROR_TYPES.INTERNAL_SERVER_ERROR;
  let messages: string[] = [];

  // Check if it's a validation error from Fastify
  if ('validation' in error && error.validation) {
    statusCode = 400;
    errorType = ERROR_TYPES.VALIDATION_ERROR;
    messages = error.validation.map(err => err.message || 'Error de validación');
  }
  // Check if it's a custom error
  else if ('isCustom' in error && error.isCustom) {
    const customError = error as CustomError;
    statusCode = customError.statusCode || 400;
    errorType = customError.errorType as ErrorType;
    messages = Array.isArray(customError.message) ? customError.message : [customError.message];
  }
  // Handle other errors
  else {
    statusCode = 500;
    errorType = ERROR_TYPES.INTERNAL_SERVER_ERROR;
    messages = ['Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'];
    console.error('❌ Error inesperado:', error);
  }

  return reply.status(statusCode).send({
    statusCode,
    error: errorType,
    messages,
  });
}
