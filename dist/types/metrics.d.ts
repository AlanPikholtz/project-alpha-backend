import { Decimal } from 'decimal.js';
export interface CreateMetricRequest {
    metric_type: string;
    metric_value: Decimal;
    metric_date: Date;
    description: string;
}
export interface UpdateMetricRequest {
    metric_type?: string;
    metric_value?: Decimal;
    metric_date?: Date;
    description?: string;
}
export interface GetMetricsQuery {
    limit?: number;
    page?: number;
    metric_type?: string;
    from?: string;
    to?: string;
}
export interface MetricsResponse<T = any> {
    data: T[];
    total: number;
    page: number;
    pages: number;
    limit: number;
}
