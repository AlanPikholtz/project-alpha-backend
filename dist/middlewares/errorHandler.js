import { ERROR_TYPES } from "../constants/errorTypes.js";
export default function errorHandler(error, req, reply) {
    let statusCode = 500;
    let errorType = ERROR_TYPES.INTERNAL_SERVER_ERROR;
    let messages = [];
    // Check if it's a validation error from Fastify
    if ('validation' in error && error.validation) {
        statusCode = 400;
        errorType = ERROR_TYPES.VALIDATION_ERROR;
        messages = error.validation.map((err) => err.message || 'Error de validación');
    }
    // Check if it's a custom error
    else if ('isCustom' in error && error.isCustom) {
        const customError = error;
        statusCode = customError.statusCode || 400;
        errorType = customError.errorType;
        messages = Array.isArray(customError.message)
            ? customError.message
            : [customError.message];
    }
    // Handle other errors
    else {
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
