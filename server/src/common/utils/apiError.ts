import status from "http-status";

class ApiError extends Error {
  public readonly statusCode: number;
  public readonly success: boolean;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;

  constructor(statusCode: number, message: string, errors?: unknown) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.success = false;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  // 400
  static badRequest(message = "Bad Request", errors?: unknown): ApiError {
    return new ApiError(status.BAD_REQUEST, message, errors);
  }

  // 401
  static unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(status.UNAUTHORIZED, message);
  }

  // 403
  static forbidden(message = "Forbidden"): ApiError {
    return new ApiError(status.FORBIDDEN, message);
  }

  // 404
  static notFound(message = "Resource not found"): ApiError {
    return new ApiError(status.NOT_FOUND, message);
  }

  // 409
  static conflict(message = "Conflict"): ApiError {
    return new ApiError(status.CONFLICT, message);
  }

  // 422
  static unprocessableEntity(
    message = "Validation failed",
    errors?: unknown,
  ): ApiError {
    return new ApiError(status.UNPROCESSABLE_ENTITY, message, errors);
  }

  // 429
  static tooManyRequests(message = "Too many requests"): ApiError {
    return new ApiError(status.TOO_MANY_REQUESTS, message);
  }

  // 500
  static internal(message = "Internal Server Error"): ApiError {
    return new ApiError(status.INTERNAL_SERVER_ERROR, message);
  }
}

export default ApiError;
