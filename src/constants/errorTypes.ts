export const ERROR_TYPES = {
  VALIDATION_ERROR: 'ValidationError',
  UNAUTHORIZED: 'UnauthorizedError',
  INVALID_CREDENTIALS: 'InvalidCredentialsError',
  TOKEN_EXPIRED: 'TokenExpiredError',
  TOKEN_INVALID: 'TokenInvalidError',
  FORBIDDEN: 'ForbiddenError',
  DUPLICATE_ENTRY: 'DuplicateEntryError',
  NOT_FOUND: 'NotFoundError',
  INTERNAL_SERVER_ERROR: 'InternalServerError',
  BAD_REQUEST: 'BadRequestError',
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];
