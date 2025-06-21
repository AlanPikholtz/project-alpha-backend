export const getAllAccountsSchema = {
  description: "Retrieve all accounts",
  tags: ["Accounts"],
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
      description: "List of accounts",
      type: "object",
      properties: {
        data: {
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
        page: { type: "integer" },
        limit: { type: "integer" },
        total: { type: "integer" },
        pages: { type: "integer" },
      },
    },
  },
};

export const createAccountSchema = {
  description: "Create a new account",
  tags: ["Accounts"],
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 3,
        maxLength: 255,
        description: "Account's name",
        errorMessage: {
          type: "El nombre de la cuenta debe ser un string.",
          minLength: "El nombre de la cuenta debe tener al menos 3 caracteres.",
          maxLength:
            "El nombre de la cuenta no puede exceder los 255 caracteres.",
        },
      },
    },
    errorMessage: {
      required: {
        name: "El nombre de la cuenta es obligatorio.",
      },
    },
  },
  response: {
    201: {
      description: "Account created successfully",
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const getAccountSchema = {
  description: "Retrieve an account by ID",
  tags: ["Accounts"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1, description: "Account ID" },
    },
  },
  response: {
    200: {
      description: "Account found",
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

export const deleteAccountSchema = {
  description: "Delete an account by ID",
  tags: ["Accounts"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1, description: "Account ID" },
    },
  },
  response: {
    204: {
      description: "La cuenta se eliminó correctamente",
    },
  },
};

export const updateAccountSchema = {
  description: "Update an account by ID",
  tags: ["Accounts"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1, description: "Account ID" },
    },
  },
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 3,
        maxLength: 255,
        description: "Account's name",
        errorMessage: {
          type: "El nombre de la cuenta debe ser un string.",
          minLength: "El nombre de la cuenta debe tener al menos 3 caracteres.",
          maxLength:
            "El nombre de la cuenta no puede exceder los 255 caracteres.",
        },
      },
    },
    errorMessage: {
      required: {
        name: "El nombre de la cuenta es obligatorio.",
      },
    },
  },
  response: {
    204: {
      description: "La cuenta se actualizó correctamente",
    },
  },
};
