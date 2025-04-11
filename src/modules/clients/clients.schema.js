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
      page: {
        type: "integer",
        minimum: 0,
        description: "Number of page",
      },
    },
  },
  response: {
    200: {
      description: "List of clients",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              code: { type: "string" },
              balance: { type: "string" },
              commission: { type: "string" },
              notes: { type: "string" },
              accountId: { type: "integer" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        page: { type: "integer" },
        limit: { type: "integer" },
        total: { type: "integer" },
        pages: { type: "integer" },
      },
    },
  },
};

export const getClientsByAccountSchema = {
  description: "Retrieve clients by account",
  tags: ["Clients"],
  params: {
    type: "object",
    required: ["accountId"],
    properties: {
      accountId: { type: "integer", minimum: 1, description: "Account ID" },
    },
  },
  querystring: {
    type: "object",
    properties: {
      limit: {
        type: "integer",
        minimum: 0,
        description: "Max number of clients to return (0 = all)",
      },
      page: {
        type: "integer",
        minimum: 0,
        description: "Number of page",
      },
    },
  },
  response: {
    200: {
      description: "List of clients",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              code: { type: "string" },
              balance: { type: "string" },
              commission: { type: "string" },
              notes: { type: "string" },
              accountId: { type: "integer" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        page: { type: "integer" },
        limit: { type: "integer" },
        total: { type: "integer" },
        pages: { type: "integer" },
      },
    },
  },
};

export const createClientSchema = {
  description: "Create a new client",
  tags: ["Clients"],
  body: {
    type: "object",
    required: ["firstName", "lastName", "code", "accountId"],
    properties: {
      firstName: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        description: "First name",
        errorMessage: {
          type: "First name must be a string.",
          minLength: "First name must be at least 3 characters long.",
          maxLength: "First name cannot exceed 100 characters.",
        },
      },
      lastName: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        description: "Last name",
        errorMessage: {
          type: "Last name must be a string.",
          minLength: "Last name must be at least 3 characters long.",
          maxLength: "Last name cannot exceed 100 characters.",
        },
      },
      code: {
        type: "string",
        minLength: 3,
        maxLength: 50,
        description: "Code",
        errorMessage: {
          type: "Code must be a string.",
          minLength: "Code must be at least 3 characters long.",
          maxLength: "Code cannot exceed 50 characters.",
        },
      },
      balance: {
        type: "number",
        default: 0.0,
        description: "Balance",
        errorMessage: {
          type: "Balance must be a number.",
        },
      },
      commission: {
        type: "number",
        minimum: 0,
        default: 0.0,
        description: "Commission",
        errorMessage: {
          type: "Commission must be a number.",
          minimum: "Commission must be >= 0.",
        },
      },
      notes: {
        type: "string",
        description: "Notes",
        errorMessage: {
          type: "Notes must be a string.",
        },
      },
      accountId: {
        type: "integer",
        description: "Account ID",
        errorMessage: {
          type: "Account ID must be an integer.",
        },
      },
    },
    errorMessage: {
      required: {
        firstName: "First name is required.",
        lastName: "Last name is required.",
        code: "Code is required.",
        accountId: "AccountId is required.",
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
        firstName: { type: "string" },
        lastName: { type: "string" },
        code: { type: "string" },
        balance: { type: "string" },
        commission: { type: "string" },
        notes: { type: "string" },
        accountId: { type: "integer" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
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
      id: { type: "integer", minimum: 1, description: "Client ID" },
    },
  },
  body: {
    type: "object",
    required: ["firstName", "lastName", "commission", "notes", "accountId"],
    properties: {
      firstName: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        description: "First name",
        errorMessage: {
          type: "First name must be a string.",
          minLength: "First name must be at least 3 characters long.",
          maxLength: "First name cannot exceed 100 characters.",
        },
      },
      lastName: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        description: "Last name",
        errorMessage: {
          type: "Last name must be a string.",
          minLength: "Last name must be at least 3 characters long.",
          maxLength: "Last name cannot exceed 100 characters.",
        },
      },
      commission: {
        type: "number",
        minimum: 0,
        default: 0.0,
        description: "Commission",
        errorMessage: {
          type: "Commission must be a number.",
          minimum: "Commission must be >= 0.",
        },
      },
      notes: {
        type: "string",
        description: "Notes",
        errorMessage: {
          type: "Notes must be a string.",
        },
      },
      accountId: {
        type: "integer",
        description: "Account ID",
        errorMessage: {
          type: "Account ID must be an integer.",
        },
      },
    },
    errorMessage: {
      required: {
        firstName: "First name is required.",
        lastName: "Last name is required.",
        commission: "Commission is required.",
        notes: "Notes is required.",
        accountId: "AccountId is required.",
      },
    },
  },
  response: {
    204: {
      description: "Client updated successfully",
    },
  },
};
