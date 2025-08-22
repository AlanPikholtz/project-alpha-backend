import {
  AccountParamsSchema,
  AccountResponseSchema,
  AccountsListResponseSchema,
  AccountsQuerySchema,
  CreateAccountBodySchema,
  CreatedAccountResponseSchema,
  UpdateAccountBodySchema,
} from '../../types/schemas.js';

export const getAllAccountsSchema = {
  description: 'Retrieve all accounts',
  tags: ['Accounts'],
  querystring: AccountsQuerySchema,
  response: {
    200: AccountsListResponseSchema,
  },
} as const;

export const createAccountSchema = {
  description: 'Create a new account',
  tags: ['Accounts'],
  body: CreateAccountBodySchema,
  response: {
    201: CreatedAccountResponseSchema,
  },
} as const;

export const getAccountSchema = {
  description: 'Retrieve an account by ID',
  tags: ['Accounts'],
  params: AccountParamsSchema,
  response: {
    200: AccountResponseSchema,
  },
} as const;

export const deleteAccountSchema = {
  description: 'Delete an account by ID',
  tags: ['Accounts'],
  params: AccountParamsSchema,
  response: {
    204: {
      description: 'La cuenta se eliminó correctamente',
    },
  },
} as const;

export const updateAccountSchema = {
  description: 'Update an account by ID',
  tags: ['Accounts'],
  params: AccountParamsSchema,
  body: UpdateAccountBodySchema,
  response: {
    204: {
      description: 'La cuenta se actualizó correctamente',
    },
  },
} as const;
