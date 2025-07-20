export class BusinessCheckError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = "BusinessCheckError";
  }
}

export class ValidationError extends BusinessCheckError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends BusinessCheckError {
  constructor(message: string, details?: any) {
    super(message, 401, details);
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends BusinessCheckError {
  constructor(message: string, details?: any) {
    super(message, 404, details);
    this.name = "NotFoundError";
  }
}

export class ApiError extends BusinessCheckError {
  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message, statusCode, details);
    this.name = "ApiError";
  }
}
