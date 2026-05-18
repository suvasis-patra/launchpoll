import type { NextFunction, Request, Response } from "express";

import ApiError from "../utils/apiError";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors ?? null,
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  if (error.name === "ZodError") {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: error,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
