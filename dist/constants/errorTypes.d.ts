export declare const ERROR_TYPES: {
    readonly VALIDATION_ERROR: "ValidationError";
    readonly UNAUTHORIZED: "UnauthorizedError";
    readonly INVALID_CREDENTIALS: "InvalidCredentialsError";
    readonly TOKEN_EXPIRED: "TokenExpiredError";
    readonly TOKEN_INVALID: "TokenInvalidError";
    readonly FORBIDDEN: "ForbiddenError";
    readonly DUPLICATE_ENTRY: "DuplicateEntryError";
    readonly NOT_FOUND: "NotFoundError";
    readonly INTERNAL_SERVER_ERROR: "InternalServerError";
    readonly BAD_REQUEST: "BadRequestError";
};
export type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];
