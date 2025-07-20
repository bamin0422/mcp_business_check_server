export declare class BusinessCheckError extends Error {
    statusCode: number;
    details?: any | undefined;
    constructor(message: string, statusCode?: number, details?: any | undefined);
}
export declare class ValidationError extends BusinessCheckError {
    constructor(message: string, details?: any);
}
export declare class AuthenticationError extends BusinessCheckError {
    constructor(message: string, details?: any);
}
export declare class NotFoundError extends BusinessCheckError {
    constructor(message: string, details?: any);
}
export declare class ApiError extends BusinessCheckError {
    constructor(message: string, statusCode?: number, details?: any);
}
//# sourceMappingURL=errors.d.ts.map