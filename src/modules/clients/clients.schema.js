export const getAllClientsSchema = {
  description: "Retrieve all clients",
  tags: ["Clients"],
  querystring: {
    type: "object",
    properties: {
      limit: {
        type: "integer",
        minimum: 0,
        description: "Max number of clients to return (0 = all)",
      },
      offset: {
        type: "integer",
        minimum: 0,
        description: "Number of records to skip",
      },
    },
  },
  response: {
    200: {
      description: "List of clients",
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

export const createClientSchema = {
  description: "Create a new client",
  tags: ["Clients"],
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        description: "Client's name",
        errorMessage: {
          type: "Client name must be a string.",
          minLength: "Client name must be at least 3 characters long.",
          maxLength: "Client name cannot exceed 100 characters.",
        },
      },
    },
    errorMessage: {
      required: {
        name: "Client name is required.",
      },
    },
  },
  response: {
    201: {
      description: "Client created successfully",
      type: "object",
      properties: {
        id: { type: "integer" },
      },
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
      id: { type: "integer", minimum: 1, description: "Client ID" },
    },
  },
  response: {
    200: {
      description: "Client found",
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  },
};
