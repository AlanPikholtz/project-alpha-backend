export const getAllClientsSchema = {
    description: "Retrieve all clients",
    tags: ["Clients"],
    querystring: {
        type: "object",
        properties: {
            limit: { type: "integer", minimum: 0 },
            page: { type: "integer", minimum: 1 },
            accountId: { type: "integer", minimum: 1 },
        },
    },
};
export const getClientSchema = {
    description: "Retrieve a client by ID",
    tags: ["Clients"],
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "integer", minimum: 1 },
        },
    },
};
export const createClientSchema = {
    description: "Create a new client",
    tags: ["Clients"],
    body: {
        type: "object",
        required: ["firstName", "code", "balance", "accountId"],
        properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            code: { type: "string" },
            balance: { type: "string" },
            commission: { type: "string" },
            notes: { type: "string" },
            accountId: { type: "integer" },
        },
    },
};
export const updateClientSchema = {
    description: "Update a client",
    tags: ["Clients"],
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "integer", minimum: 1 },
        },
    },
    body: {
        type: "object",
        required: ["firstName", "commission", "accountId"],
        properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            commission: { type: "string" },
            notes: { type: "string" },
            accountId: { type: "integer" },
        },
    },
};
export const updateClientBalanceSchema = {
    description: "Update client balance",
    tags: ["Clients"],
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "integer", minimum: 1 },
        },
    },
    body: {
        type: "object",
        required: ["balance"],
        properties: {
            balance: { type: "string" },
        },
    },
};
export const deleteClientSchema = {
    description: "Delete a client",
    tags: ["Clients"],
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "integer", minimum: 1 },
        },
    },
};
export const getClientOperationsSchema = {
    description: "Get client operations",
    tags: ["Clients"],
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "integer", minimum: 1 },
        },
    },
    querystring: {
        type: "object",
        properties: {
            limit: { type: "integer", minimum: 0 },
            page: { type: "integer", minimum: 1 },
            from: { type: "string" },
            to: { type: "string" },
            sort: { type: "string" },
            order: { type: "string", enum: ["asc", "desc"] },
            type: { type: "string" },
        },
    },
};
