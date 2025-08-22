export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RegisterResponse {
  id: number;
}

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  id: number;
  username?: string;
  iat?: number;
  exp?: number;
}
