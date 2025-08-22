export interface CreateAccountRequest {
  name: string;
}

export interface UpdateAccountRequest {
  name: string;
}

export interface GetAccountsQuery {
  limit?: number;
  page?: number;
}

export interface AccountsResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}
