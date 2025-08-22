export interface CustomError extends Error {
    isCustom: true;
    statusCode: number;
    errorType: string;
    message: string;
}
export interface DatabaseError extends Error {
    code?: string;
    errno?: number;
    sqlState?: string;
    sqlMessage?: string;
}
export type AppError = CustomError | DatabaseError | Error;
