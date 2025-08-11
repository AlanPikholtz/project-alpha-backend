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
      accountId: {
        type: "integer",
        minimum: 1,
        description: "Account ID",
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
    required: ["firstName", "code", "accountId"],
    properties: {
      firstName: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        description: "First name",
        errorMessage: {
          type: "El nombre debe ser un string.",
          minLength: "El nombre debe tener al menos 3 caracteres.",
          maxLength: "El nombre no puede exceder los 100 caracteres.",
        },
      },
      lastName: {
        type: "string",
        minLength: 1,
        maxLength: 100,
        description: "Last name",
        errorMessage: {
          type: "El apellido debe ser un string.",
          minLength: "El apellido debe tener al menos 1 caracter.",
          maxLength: "El apellido no puede exceder los 100 caracteres.",
        },
      },
      code: {
        type: "string",
        minLength: 3,
        maxLength: 50,
        description: "Code",
        errorMessage: {
          type: "El código debe ser un string.",
          minLength: "El código debe tener al menos 3 caracteres.",
          maxLength: "El código no puede exceder los 50 caracteres.",
        },
      },
      balance: {
        type: "number",
        default: 0.0,
        description: "Balance",
        errorMessage: {
          type: "El balance debe ser un número.",
        },
      },
      commission: {
        type: "number",
        minimum: 0,
        default: 0.0,
        description: "Commission",
        errorMessage: {
          type: "La comisión debe ser un número.",
          minimum: "La comisión debe ser >= 0.",
        },
      },
      notes: {
        type: "string",
        description: "Notes",
        errorMessage: {
          type: "Las notas deben ser un string.",
        },
      },
      accountId: {
        type: "integer",
        description: "Account ID",
        errorMessage: {
          type: "El ID de la cuenta debe ser un número entero.",
        },
      },
    },
    errorMessage: {
      required: {
        firstName: "El nombre es obligatorio.",
        code: "El código es obligatorio.",
        accountId: "El ID de la cuenta es obligatorio.",
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
    required: ["firstName", "commission", "notes", "accountId"],
    properties: {
      firstName: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        description: "First name",
        errorMessage: {
          type: "El nombre debe ser un string.",
          minLength: "El nombre debe tener al menos 3 caracteres.",
          maxLength: "El nombre no puede exceder los 100 caracteres.",
        },
      },
      lastName: {
        type: "string",
        minLength: 1,
        maxLength: 100,
        description: "Last name",
        errorMessage: {
          type: "El apellido debe ser un string.",
          minLength: "El apellido debe tener al menos 1 caracter.",
          maxLength: "El apellido no puede exceder los 100 caracteres.",
        },
      },
      commission: {
        type: "number",
        minimum: 0,
        default: 0.0,
        description: "Commission",
        errorMessage: {
          type: "La comisión debe ser un número.",
          minimum: "La comisión debe ser >= 0.",
        },
      },
      notes: {
        type: "string",
        description: "Notes",
        errorMessage: {
          type: "Las notas deben ser un string.",
        },
      },
      accountId: {
        type: "integer",
        description: "Account ID",
        errorMessage: {
          type: "El ID de la cuenta debe ser un número entero.",
        },
      },
    },
    errorMessage: {
      required: {
        firstName: "El nombre es obligatorio.",
        commission: "La comisión es obligatoria.",
        notes: "Las notas son obligatorias.",
        accountId: "El ID de la cuenta es obligatorio.",
      },
    },
  },
  response: {
    204: {
      description: "El cliente se actualizó correctamente",
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
      id: { type: "integer", minimum: 1, description: "Client ID" },
    },
  },
  response: {
    204: {
      description: "El cliente se eliminó correctamente",
    },
  },
};

export const updateClientBalanceSchema = {
  description: "Update a client balance",
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
    required: ["balance"],
    properties: {
      balance: {
        type: "number",
        description: "Balance",
        errorMessage: {
          type: "El balance debe ser un número.",
        },
      },
    },
    errorMessage: {
      required: {
        balance: "El balance es obligatorio.",
      },
    },
  },
  response: {
    204: {
      description: "El balance del cliente se actualizó correctamente",
    },
  },
};

export const getClientOperationsSchema = {
  description: "Retrieve a client operations by client ID",
  tags: ["Clients"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1, description: "Client ID" },
    },
  },
  querystring: {
    type: "object",
    properties: {
      limit: {
        type: "integer",
        minimum: 0,
        description: "Max number of operations to return (0 = all)",
      },
      page: {
        type: "integer",
        minimum: 0,
        description: "Number of page",
      },
      from: {
        type: "string",
        format: "date-time",
        description: "Start date for filtering operations",
        errorMessage: {
          type: "Date must be a string.",
          format: "Date must be an ISO 8601 date string.",
        },
      },
      to: {
        type: "string",
        format: "date-time",
        description: "End date for filtering operations",
        errorMessage: {
          type: "Date must be a string.",
          format: "Date must be an ISO 8601 date string.",
        },
      },
      sort: {
        type: "string",
        enum: ["assignedAt", "date"],
        description: "Sort field",
        errorMessage: {
          type: "Sort field must be a string.",
          enum: "Sort field must be [assignedAt] | [date].",
        },
      },
      order: {
        type: "string",
        enum: ["asc", "desc"],
        description: "Sort order",
        errorMessage: {
          type: "Sort order must be a string.",
          enum: "Sort order must be [asc] | [desc].",
        },
      },
      type: {
        type: "string",
        enum: ["transactions", "payments", "all"],
        description: "Operations type",
        errorMessage: {
          type: "Operations type must be a string.",
          enum: "Operations type must be [transactions] | [payments] | [all].",
        },
      },
    },
  },
  response: {
    200: {
      description: "List of operations",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              date: { type: "string", format: "date-time" },
              type: { type: "string" },
              amount: { type: "string" },
              currency: { type: "string" },
              method: { type: ["string", "null"] },
              clientAmount: { type: ["string", "null"] },
              assignedAt: { type: "string", format: "date-time" },
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
