import { ERROR_TYPES } from "../../constants/errorTypes.js";
import { fetchAccountById } from "../accounts/accounts.repository.js";
import { deleteClient, fetchClientByCode, fetchClientById, fetchClientOperations, fetchClients, fetchCountClients, fetchCountOperations, insertClient, putClient, putClientBalance, } from "./clients.repository.js";
export async function getAllClients(fastify, limit, offset, page, accountId) {
    if (accountId) {
        const account = await fetchAccountById(fastify, accountId);
        if (!account) {
            const error = {
                name: "CustomError",
                message: `No se encontró cuenta con id ${accountId}.`,
                isCustom: true,
                statusCode: 404,
                errorType: ERROR_TYPES.NOT_FOUND,
            };
            throw error;
        }
    }
    const clients = await fetchClients(fastify, limit, offset, accountId);
    const totalClients = await fetchCountClients(fastify, accountId);
    const totalPages = !limit ? 1 : Math.ceil(totalClients / limit);
    return {
        data: clients,
        total: totalClients,
        page: page,
        pages: totalPages,
        limit: limit ?? 0,
    };
}
export async function getClientById(fastify, id) {
    const client = await fetchClientById(fastify, id);
    if (!client) {
        const error = {
            name: "CustomError",
            message: `No se encontró cliente con id ${id}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    return client;
}
export async function createClient(fastify, firstName, lastName, code, balance, commission, notes, accountId) {
    const client = await fetchClientByCode(fastify, code);
    if (client) {
        const error = {
            name: "CustomError",
            message: "Este código ya está registrado. Por favor, utiliza un código diferente.",
            isCustom: true,
            statusCode: 400,
            errorType: ERROR_TYPES.DUPLICATE_ENTRY,
        };
        throw error;
    }
    const account = await fetchAccountById(fastify, accountId);
    if (!account) {
        const error = {
            name: "CustomError",
            message: `No se encontró cuenta con id ${accountId}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const result = await insertClient(fastify, firstName, lastName, code, balance, commission, notes, accountId);
    return { id: result.insertId };
}
export async function updateClient(fastify, clientId, firstName, lastName, commission, notes, accountId) {
    const client = await fetchClientById(fastify, clientId);
    if (!client) {
        const error = {
            name: "CustomError",
            message: `No se encontró cliente con id ${clientId}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const account = await fetchAccountById(fastify, accountId);
    if (!account) {
        const error = {
            name: "CustomError",
            message: `No se encontró cuenta con id ${accountId}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await putClient(fastify, clientId, firstName, lastName, commission, notes, accountId);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al actualizar el cliente ${clientId}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded: succeeded };
}
export async function updateClientBalance(fastify, clientId, balance) {
    const client = await fetchClientById(fastify, clientId);
    if (!client) {
        const error = {
            name: "CustomError",
            message: `No se encontró cliente con id ${clientId}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await putClientBalance(fastify, clientId, balance);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al actualizar el balance del cliente ${clientId}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded: succeeded };
}
export async function deleteClientById(fastify, clientId) {
    const client = await fetchClientById(fastify, clientId);
    if (!client) {
        const error = {
            name: "CustomError",
            message: `No se encontró cliente con id ${clientId}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const succeeded = await deleteClient(fastify, clientId);
    if (!succeeded) {
        const error = {
            name: "CustomError",
            message: `Ocurrió un error al eliminar el cliente ${clientId}.`,
            isCustom: true,
            statusCode: 500,
            errorType: ERROR_TYPES.INTERNAL_SERVER_ERROR,
        };
        throw error;
    }
    return { succeeded: succeeded };
}
export async function getClientOperations(fastify, clientId, limit, offset, from, to, sort, order, page, type) {
    const client = await fetchClientById(fastify, clientId);
    if (!client) {
        const error = {
            name: "CustomError",
            message: `No se encontró cliente con id ${clientId}.`,
            isCustom: true,
            statusCode: 404,
            errorType: ERROR_TYPES.NOT_FOUND,
        };
        throw error;
    }
    const operations = await fetchClientOperations(fastify, clientId, limit, offset, from, to, sort, order, type);
    const totalOperations = await fetchCountOperations(fastify, clientId, from, to, type);
    const totalPages = !limit ? 1 : Math.ceil(totalOperations / limit);
    return {
        data: operations,
        total: totalOperations,
        page: page || 1,
        pages: totalPages,
        limit: limit ?? 0,
    };
}
