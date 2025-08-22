import { Decimal } from 'decimal.js';

export interface CreatePaymentRequest {
  account_id: number;
  payment_method: 'card' | 'bank_transfer' | 'cash';
  amount: Decimal;
  currency: string;
  description: string;
  external_reference?: string;
}

export interface UpdatePaymentRequest {
  payment_method?: 'card' | 'bank_transfer' | 'cash';
  amount?: Decimal;
  currency?: string;
  description?: string;
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  external_reference?: string;
}

export interface GetPaymentsQuery {
  limit?: number;
  page?: number;
  account_id?: number;
  status?: string;
  payment_method?: string;
}

export interface PaymentsResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}
