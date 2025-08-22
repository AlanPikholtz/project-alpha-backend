export const getAllPaymentsSchema = {
  description: 'Retrieve all payments',
  tags: ['Payments'],
} as const;

export const getPaymentSchema = {
  description: 'Retrieve a payment by ID',
  tags: ['Payments'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', minimum: 1 },
    },
  },
} as const;

export const createPaymentSchema = {
  description: 'Create a new payment',
  tags: ['Payments'],
  body: {
    type: 'object',
    required: ['account_id', 'payment_method', 'amount', 'currency', 'description'],
    properties: {
      account_id: { type: 'integer' },
      payment_method: { type: 'string', enum: ['card', 'bank_transfer', 'cash'] },
      amount: { type: 'string' },
      currency: { type: 'string' },
      description: { type: 'string' },
      external_reference: { type: 'string' },
    },
  },
} as const;

export const updatePaymentSchema = {
  description: 'Update a payment',
  tags: ['Payments'],
} as const;

export const deletePaymentSchema = {
  description: 'Delete a payment',
  tags: ['Payments'],
} as const;
