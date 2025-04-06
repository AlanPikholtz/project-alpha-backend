export const createTransactionSchema = {
  description: "Create a transaction",
  tags: ["Transactions"],

  body: {
    type: "object",
    required: ["date", "type", "amount", "currency"],
    properties: {
      date: {
        type: "string",
        format: "date-time",
        description: "DateTime of the transaction",
        errorMessage: {
          type: "Date must be a string.",
          format: "Date must be an ISO 8601 date string.",
        },
      },
      type: {
        type: "string",
        enum: ["deposit", "withdrawal", "exchange"],
        description: "Transaction type",
        errorMessage: {
          type: "Transaction type must be a string.",
          enum: "Transaction type must be [deposit] | [withdrawal] | [exchange].",
        },
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
      currency: {
        type: "string",
        enum: ["ARS"],
        description: "Transaction currency",
        errorMessage: {
          type: "Transaction currency must be a string.",
          enum: "Transaction currency must be [ARS].",
        },
      },
    },
    errorMessage: {
      required: {
        date: "Date is required.",
        type: "Type is required.",
        amount: "Amount is required.",
        currency: "Currency is required.",
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

export const getClientTransactionsSchema = {
  description: "Retrieve transactions of a client",
  tags: ["Transactions"],
  params: {
    type: "object",
    properties: {
      clientId: {
        type: "integer",
        minimum: 1,
        description: "Client ID",
      },
    },
  },
  response: {
    200: {
      description: "List of transactions",
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          date: { type: "string", format: "date-time" },
          type: { type: "string" },
          amount: { type: "string" },
          currency: { type: "string" },
          clientId: { type: "integer" },
          accountId: { type: "integer" },
          clientBalance: { type: "string" },
          commissionAmount: { type: "string" },
          assignedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
        },
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
        errorMessage: {
          type: "Transaction status must be a string.",
          enum: "Transaction status must be [assigned] | [unassigned].",
        },
      },
      limit: {
        type: "integer",
        minimum: 0,
        description: "Max number of transactions to return (0 = all)",
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
      description: "List of transactions",
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
          accountId: { type: ["integer", "null"] },
          clientBalance: { type: ["string", "null"] },
          commissionAmount: { type: ["string", "null"] },
          assignedAt: { type: ["string", "null"], format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

export const updateTransactionSchema = {
  description: "Update a transaction",
  tags: ["Transactions"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1, description: "Transaction ID" },
    },
  },
  body: {
    type: "object",
    required: ["clientId"],
    properties: {
      clientId: {
        type: "integer",
        minimum: 1,
        description: "Client ID",
      },
    },
    errorMessage: {
      required: {
        clientId: "Client ID is required.",
      },
    },
  },
  response: {
    204: {
      description: "Transaction updated successfully",
    },
  },
};
