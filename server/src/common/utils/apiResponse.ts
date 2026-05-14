import status from "http-status";
import type { Response } from "express";

class ApiResponse {
  static ok<T>(
    res: Response,
    message: string,
    data: T | null = null,
  ): Response {
    return res.status(status.OK).json({
      success: true,
      message,
      data,
    });
  }

  static created<T>(
    res: Response,
    message: string,
    data: T | null = null,
  ): Response {
    return res.status(status.CREATED).json({
      success: true,
      message,
      data,
    });
  }

  static noContent(res: Response): Response {
    return res.status(status.NO_CONTENT).send();
  }
}

export default ApiResponse;
