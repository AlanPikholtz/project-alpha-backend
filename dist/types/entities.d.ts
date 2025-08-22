import { Decimal } from 'decimal.js';
export interface User {
    id: number;
    username: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}
export interface Client {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}
export interface Account {
    id: number;
    user_id: number;
    client_id: number;
    account_type: 'savings' | 'checking' | 'credit';
    balance: Decimal;
    currency: string;
    status: 'active' | 'inactive' | 'suspended';
    created_at: Date;
    updated_at: Date;
}
export interface Transaction {
    id: number;
    user_id: number;
    account_id: number;
    transaction_type: 'deposit' | 'withdrawal' | 'transfer';
    amount: Decimal;
    currency: string;
    description: string;
    reference: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    created_at: Date;
    updated_at: Date;
}
export interface Payment {
    id: number;
    user_id: number;
    account_id: number;
    payment_method: 'card' | 'bank_transfer' | 'cash';
    amount: Decimal;
    currency: string;
    description: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    external_reference: string;
    created_at: Date;
    updated_at: Date;
}
export interface Metric {
    id: number;
    user_id: number;
    metric_type: string;
    metric_value: Decimal;
    metric_date: Date;
    description: string;
    created_at: Date;
}
