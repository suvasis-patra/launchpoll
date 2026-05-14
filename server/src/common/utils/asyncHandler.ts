import type { RequestHandler, Request, Response, NextFunction } from "express";

export function asyncHandler(requestHandler: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
}
