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
          type: "Account name must be a string.",
          minLength: "Account name must be at least 3 characters long.",
          maxLength: "Account name cannot exceed 255 characters.",
        },
      },
    },
    errorMessage: {
      required: {
        name: "Account name is required.",
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
          type: "Account name must be a string.",
          minLength: "Account name must be at least 3 characters long.",
          maxLength: "Account name cannot exceed 255 characters.",
        },
      },
    },
    errorMessage: {
      required: {
        name: "Account name is required.",
      },
    },
  },
  response: {
    204: {
      description: "Account updated successfully",
    },
  },
};
