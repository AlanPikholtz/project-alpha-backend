import { Decimal } from 'decimal.js';
export interface CreateClientRequest {
    firstName: string;
    lastName?: string;
    code: string;
    balance: Decimal;
    commission?: Decimal;
    notes?: string;
    accountId: number;
}
export interface UpdateClientRequest {
    firstName: string;
    lastName?: string;
    commission: Decimal;
    notes?: string;
    accountId: number;
}
export interface UpdateClientBalanceRequest {
    balance: Decimal;
}
export interface GetClientsQuery {
    limit?: number;
    page?: number;
    accountId?: number;
}
export interface GetClientOperationsQuery {
    limit?: number;
    page?: number;
    from?: string;
    to?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    type?: string;
}
export interface ClientsResponse<T = any> {
    data: T[];
    total: number;
    page: number;
    pages: number;
    limit: number;
}
