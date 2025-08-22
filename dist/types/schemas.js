import { Type } from '@sinclair/typebox';
// ============================================================================
// AUTH SCHEMAS & TYPES
// ============================================================================
export const RegisterBodySchema = Type.Object({
    username: Type.String({
        minLength: 1,
        errorMessage: "El nombre de usuario es obligatorio."
    }),
    password: Type.String({
        minLength: 8,
        errorMessage: "La contraseña debe tener al menos 8 caracteres."
    })
});
export const LoginBodySchema = Type.Object({
    username: Type.String({
        errorMessage: "El nombre de usuario es obligatorio."
    }),
    password: Type.String({
        errorMessage: "La contraseña es obligatoria."
    })
});
export const RefreshBodySchema = Type.Object({
    refreshToken: Type.String({
        errorMessage: "El refresh token es obligatorio."
    })
});
export const AuthTokensResponseSchema = Type.Object({
    accessToken: Type.String(),
    refreshToken: Type.String()
});
export const RegisterResponseSchema = Type.Object({
    id: Type.Integer()
});
// ============================================================================
// ACCOUNTS SCHEMAS & TYPES  
// ============================================================================
export const AccountParamsSchema = Type.Object({
    id: Type.String({ pattern: '^[0-9]+$' }) // Solo números como string
});
export const AccountsQuerySchema = Type.Object({
    limit: Type.Optional(Type.Integer({ minimum: 0, default: 10 })),
    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 }))
});
export const CreateAccountBodySchema = Type.Object({
    name: Type.String({
        minLength: 3,
        maxLength: 255,
        errorMessage: "El nombre de la cuenta debe tener entre 3 y 255 caracteres."
    })
});
export const UpdateAccountBodySchema = Type.Object({
    name: Type.String({
        minLength: 3,
        maxLength: 255,
        errorMessage: "El nombre de la cuenta debe tener entre 3 y 255 caracteres."
    })
});
export const AccountResponseSchema = Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
});
export const AccountsListResponseSchema = Type.Object({
    data: Type.Array(AccountResponseSchema),
    total: Type.Integer(),
    page: Type.Integer(),
    pages: Type.Integer(),
    limit: Type.Integer()
});
export const CreatedAccountResponseSchema = Type.Object({
    id: Type.Integer()
});
// ============================================================================
// CLIENTS SCHEMAS & TYPES
// ============================================================================
export const ClientParamsSchema = Type.Object({
    id: Type.String({ pattern: '^[0-9]+$' })
});
export const ClientsQuerySchema = Type.Object({
    limit: Type.Optional(Type.Integer({ minimum: 0, default: 10 })),
    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
    accountId: Type.Optional(Type.Integer({ minimum: 1 }))
});
export const CreateClientBodySchema = Type.Object({
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.Optional(Type.String()),
    code: Type.String({ minLength: 1 }),
    balance: Type.String(), // Decimal como string
    commission: Type.Optional(Type.String()),
    notes: Type.Optional(Type.String()),
    accountId: Type.Integer({ minimum: 1 })
});
export const UpdateClientBodySchema = Type.Object({
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.Optional(Type.String()),
    commission: Type.String(),
    notes: Type.Optional(Type.String()),
    accountId: Type.Integer({ minimum: 1 })
});
export const UpdateClientBalanceBodySchema = Type.Object({
    balance: Type.String()
});
