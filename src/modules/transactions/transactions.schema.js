export const createTransactionSchema = {
  description: "Create a transaction",
  tags: ["Transactions"],
  body: {
    type: "object",
    required: ["date", "type", "amount", "currency", "accountId"],
    properties: {
      date: {
        type: "string",
        format: "date-time",
        description: "DateTime of the transaction",
        errorMessage: {
          type: "La fecha debe ser un string.",
          format: "La fecha debe ser una cadena de fecha ISO 8601.",
        },
      },
      type: {
        type: "string",
        enum: ["deposit", "withdrawal", "exchange"],
        description: "Transaction type",
        errorMessage: {
          type: "El tipo de transacción debe ser un string.",
          enum: "El tipo de transacción debe ser [deposit] | [withdrawal] | [exchange].",
        },
      },
      amount: {
        type: "number",
        minimum: 0.01,
        description: "Transaction amount",
        errorMessage: {
          type: "La cantidad de la transacción debe ser un número.",
          minimum: "La cantidad de la transacción debe ser >= 0.01.",
        },
      },
      currency: {
        type: "string",
        enum: ["ARS"],
        description: "Transaction currency",
        errorMessage: {
          type: "La moneda de la transacción debe ser un string.",
          enum: "La moneda de la transacción debe ser [ARS].",
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
        date: "La fecha es obligatoria.",
        type: "El tipo es obligatorio.",
        amount: "La cantidad es obligatoria.",
        currency: "La moneda es obligatoria.",
        accountId: "El ID de la cuenta es obligatorio.",
      },
    },
  },
  response: {
    201: {
      description: "Transaction created successfully",
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const getTransactionsSchema = {
  description: "Retrieve transactions",
  tags: ["Transactions"],
  querystring: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["assigned", "unassigned"],
        description: "Status of the transaction",
      },
      clientId: {
        type: "integer",
        minimum: 1,
        description: "Client ID",
      },
      accountId: {
        type: "integer",
        minimum: 1,
        description: "Account ID",
      },
      limit: {
        type: "integer",
        minimum: 0,
        description: "Max number of transactions to return (0 = all)",
      },
      page: {
        type: "integer",
        minimum: 0,
        description: "Number of page",
      },
      amount: {
        type: "number",
        minimum: 0.01,
        description: "Transaction amount",
        errorMessage: {
          type: "Transaction amount must be a number.",
          minimum: "Transaction amount must be >= 0.01.",
        },
      },
      from: {
        type: "string",
        format: "date-time",
        description: "Start date for filtering transactions",
        errorMessage: {
          type: "Date must be a string.",
          format: "Date must be an ISO 8601 date string.",
        },
      },
      to: {
        type: "string",
        format: "date-time",
        description: "End date for filtering transactions",
        errorMessage: {
          type: "Date must be a string.",
          format: "Date must be an ISO 8601 date string.",
        },
      },
      sort: {
        type: "string",
        enum: ["assignedAt", "createdAt", "date"],
        description: "Sort field",
        errorMessage: {
          type: "Sort field must be a string.",
          enum: "Sort field must be [assignedAt] | [createdAt] | [date].",
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
    },
  },
  response: {
    200: {
      description: "List of transactions",
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
              clientId: { type: ["integer", "null"] },
              clientFullName: { type: ["string", "null"] },
              accountId: { type: ["integer", "null"] },
              commissionAmount: { type: ["string", "null"] },
              clientAmount: { type: ["string", "null"] },
              assignedAt: { type: ["string", "null"], format: "date-time" },
              createdAt: { type: "string", format: "date-time" },
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

export const assignTransactionsSchema = {
  description: "Assign transactions",
  tags: ["Transactions"],
  params: {
    type: "object",
    properties: {
      clientId: {
        type: "integer",
        description: "Client ID",
        errorMessage: {
          type: "El ID del cliente debe ser un número entero.",
        },
      },
    },
  },
  body: {
    type: "object",
    required: ["transactionIds"],
    properties: {
      transactionIds: {
        type: "array",
        items: { type: "integer" },
        minItems: 1,
        uniqueItems: true,
        errorMessage: {
          type: "transactionIds debe ser un array.",
          minItems: "transactionIds debe tener al menos un elemento.",
          uniqueItems: "transactionIds no puede tener elementos duplicados.",
        },
      },
    },
    errorMessage: {
      required: {
        transactionIds: "transactionIds es obligatorio.",
      },
    },
  },
  response: {
    204: {
      description: "La transacción se actualizó correctamente",
    },
  },
};

export const bulkCreateTransactionsSchema = {
  description: "Bulk create transactions",
  tags: ["Transactions"],
  params: {
    type: "object",
    properties: {
      accountId: {
        type: "integer",
        description: "Account ID",
        errorMessage: {
          type: "El ID de la cuenta debe ser un número entero.",
        },
      },
    },
  },
  body: {
    type: "array",
    items: {
      type: "object",
      required: ["date", "type", "amount", "currency"],
      properties: {
        date: {
          type: "string",
          format: "date-time",
          description: "DateTime of the transaction",
          errorMessage: {
            type: "La fecha debe ser un string.",
            format: "La fecha debe ser una cadena de fecha ISO 8601.",
          },
        },
        type: {
          type: "string",
          enum: ["deposit", "withdrawal", "exchange"],
          description: "Transaction type",
          errorMessage: {
            type: "El tipo de transacción debe ser un string.",
            enum: "El tipo de transacción debe ser [deposit] | [withdrawal] | [exchange].",
          },
        },
        amount: {
          type: "number",
          minimum: 0.01,
          description: "Transaction amount",
          errorMessage: {
            type: "La cantidad de la transacción debe ser un número.",
            minimum: "La cantidad de la transacción debe ser >= 0.01.",
          },
        },
        currency: {
          type: "string",
          enum: ["ARS"],
          description: "Transaction currency",
          errorMessage: {
            type: "La moneda de la transacción debe ser un string.",
            enum: "La moneda de la transacción debe ser [ARS].",
          },
        },
      },
      errorMessage: {
        required: {
          date: "La fecha es obligatoria.",
          type: "El tipo es obligatorio.",
          amount: "La cantidad es obligatoria.",
          currency: "La moneda es obligatoria.",
        },
      },
    },
  },
  response: {
    201: {
      description: "Transacciones creadas correctamente",
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const unassignTransactionSchema = {
  description: "Unassign transaction",
  tags: ["Transactions"],
  params: {
    type: "object",
    properties: {
      transactionId: {
        type: "integer",
        description: "Transaction ID",
        errorMessage: {
          type: "El ID de transacción debe ser un número entero.",
        },
      },
    },
  },
  response: {
    204: {
      description: "La transacción se actualizó correctamente",
    },
  },
};
