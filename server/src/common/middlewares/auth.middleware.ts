import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import ApiError from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import type { JwtClaims } from "../../modules/auth/utils/types";

export const authorizeUser = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token =
      req.headers.cookie ?? req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw ApiError.unauthorized();
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtClaims;
      req.headers["userId"] = payload.sub;
      next();
    } catch (error) {
      throw ApiError.unauthorized();
    }
  },
);
