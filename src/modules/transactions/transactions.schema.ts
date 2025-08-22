export const getAllTransactionsSchema = {
  description: 'Retrieve all transactions',
  tags: ['Transactions'],
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'integer', minimum: 0 },
      page: { type: 'integer', minimum: 1 },
    },
  },
} as const;

export const getTransactionSchema = {
  description: 'Retrieve a transaction by ID',
  tags: ['Transactions'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', minimum: 1 },
    },
  },
} as const;

export const createTransactionSchema = {
  description: 'Create a new transaction',
  tags: ['Transactions'],
  body: {
    type: 'object',
    required: ['account_id', 'transaction_type', 'amount', 'currency', 'description', 'reference'],
    properties: {
      account_id: { type: 'integer' },
      transaction_type: { type: 'string', enum: ['deposit', 'withdrawal', 'transfer'] },
      amount: { type: 'string' },
      currency: { type: 'string' },
      description: { type: 'string' },
      reference: { type: 'string' },
    },
  },
} as const;

export const updateTransactionSchema = {
  description: 'Update a transaction',
  tags: ['Transactions'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', minimum: 1 },
    },
  },
  body: {
    type: 'object',
    properties: {
      transaction_type: { type: 'string', enum: ['deposit', 'withdrawal', 'transfer'] },
      amount: { type: 'string' },
      currency: { type: 'string' },
      description: { type: 'string' },
      reference: { type: 'string' },
      status: { type: 'string', enum: ['pending', 'completed', 'failed', 'cancelled'] },
    },
  },
} as const;

export const deleteTransactionSchema = {
  description: 'Delete a transaction',
  tags: ['Transactions'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', minimum: 1 },
    },
  },
} as const;
