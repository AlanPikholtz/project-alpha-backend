import { Static } from '@sinclair/typebox';
export declare const RegisterBodySchema: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
}>;
export declare const LoginBodySchema: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
}>;
export declare const RefreshBodySchema: import("@sinclair/typebox").TObject<{
    refreshToken: import("@sinclair/typebox").TString;
}>;
export declare const AuthTokensResponseSchema: import("@sinclair/typebox").TObject<{
    accessToken: import("@sinclair/typebox").TString;
    refreshToken: import("@sinclair/typebox").TString;
}>;
export declare const RegisterResponseSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TInteger;
}>;
export type RegisterBody = Static<typeof RegisterBodySchema>;
export type LoginBody = Static<typeof LoginBodySchema>;
export type RefreshBody = Static<typeof RefreshBodySchema>;
export type AuthTokensResponse = Static<typeof AuthTokensResponseSchema>;
export type RegisterResponse = Static<typeof RegisterResponseSchema>;
export declare const AccountParamsSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
}>;
export declare const AccountsQuerySchema: import("@sinclair/typebox").TObject<{
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export declare const CreateAccountBodySchema: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
}>;
export declare const UpdateAccountBodySchema: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
}>;
export declare const AccountResponseSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TInteger;
    name: import("@sinclair/typebox").TString;
    createdAt: import("@sinclair/typebox").TString;
    updatedAt: import("@sinclair/typebox").TString;
}>;
export declare const AccountsListResponseSchema: import("@sinclair/typebox").TObject<{
    data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TInteger;
        name: import("@sinclair/typebox").TString;
        createdAt: import("@sinclair/typebox").TString;
        updatedAt: import("@sinclair/typebox").TString;
    }>>;
    total: import("@sinclair/typebox").TInteger;
    page: import("@sinclair/typebox").TInteger;
    pages: import("@sinclair/typebox").TInteger;
    limit: import("@sinclair/typebox").TInteger;
}>;
export declare const CreatedAccountResponseSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TInteger;
}>;
export type AccountParams = Static<typeof AccountParamsSchema>;
export type AccountsQuery = Static<typeof AccountsQuerySchema>;
export type CreateAccountBody = Static<typeof CreateAccountBodySchema>;
export type UpdateAccountBody = Static<typeof UpdateAccountBodySchema>;
export type AccountResponse = Static<typeof AccountResponseSchema>;
export type AccountsListResponse = Static<typeof AccountsListResponseSchema>;
export type CreatedAccountResponse = Static<typeof CreatedAccountResponseSchema>;
export declare const ClientParamsSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
}>;
export declare const ClientsQuerySchema: import("@sinclair/typebox").TObject<{
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    accountId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export declare const CreateClientBodySchema: import("@sinclair/typebox").TObject<{
    firstName: import("@sinclair/typebox").TString;
    lastName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    code: import("@sinclair/typebox").TString;
    balance: import("@sinclair/typebox").TString;
    commission: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    notes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    accountId: import("@sinclair/typebox").TInteger;
}>;
export declare const UpdateClientBodySchema: import("@sinclair/typebox").TObject<{
    firstName: import("@sinclair/typebox").TString;
    lastName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    commission: import("@sinclair/typebox").TString;
    notes: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    accountId: import("@sinclair/typebox").TInteger;
}>;
export declare const UpdateClientBalanceBodySchema: import("@sinclair/typebox").TObject<{
    balance: import("@sinclair/typebox").TString;
}>;
export type ClientParams = Static<typeof ClientParamsSchema>;
export type ClientsQuery = Static<typeof ClientsQuerySchema>;
export type CreateClientBody = Static<typeof CreateClientBodySchema>;
export type UpdateClientBody = Static<typeof UpdateClientBodySchema>;
export type UpdateClientBalanceBody = Static<typeof UpdateClientBalanceBodySchema>;
