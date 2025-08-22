import { Decimal } from 'decimal.js';

export interface CreateTransactionRequest {
  account_id: number;
  transaction_type: 'deposit' | 'withdrawal' | 'transfer';
  amount: Decimal;
  currency: string;
  description: string;
  reference: string;
}

export interface UpdateTransactionRequest {
  transaction_type?: 'deposit' | 'withdrawal' | 'transfer';
  amount?: Decimal;
  currency?: string;
  description?: string;
  reference?: string;
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
}

export interface GetTransactionsQuery {
  limit?: number;
  page?: number;
  account_id?: number;
  status?: string;
  transaction_type?: string;
}

export interface TransactionsResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}
