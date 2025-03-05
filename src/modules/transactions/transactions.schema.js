export const createTransactionSchema = {
  description: "Create a deposit or payment for a client",
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
  body: {
    type: "object",
    required: ["type", "amount"],
    properties: {
      type: {
        type: "string",
        enum: ["deposit", "payment"],
        description: "Transaction type",
        errorMessage: {
          type: "Transaction type must be a string.",
          enum: "Transaction type must be deposit | payment",
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
    },
    errorMessage: {
      required: {
        type: "Type is required.",
        amount: "Amount is required.",
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
          clientId: { type: "integer" },
          type: { type: "string" },
          amount: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};
