"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.NotFoundError = exports.AuthenticationError = exports.ValidationError = exports.BusinessCheckError = void 0;
class BusinessCheckError extends Error {
    constructor(message, statusCode = 500, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = "BusinessCheckError";
    }
}
exports.BusinessCheckError = BusinessCheckError;
class ValidationError extends BusinessCheckError {
    constructor(message, details) {
        super(message, 400, details);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends BusinessCheckError {
    constructor(message, details) {
        super(message, 401, details);
        this.name = "AuthenticationError";
    }
}
exports.AuthenticationError = AuthenticationError;
class NotFoundError extends BusinessCheckError {
    constructor(message, details) {
        super(message, 404, details);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class ApiError extends BusinessCheckError {
    constructor(message, statusCode = 500, details) {
        super(message, statusCode, details);
        this.name = "ApiError";
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=errors.js.map