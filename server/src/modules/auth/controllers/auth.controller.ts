import type { Request, Response } from "express";

import {
  loginUserService,
  registerUserService,
} from "../services/auth.services";
import ApiResponse from "../../../common/utils/apiResponse";
import { asyncHandler } from "../../../common/utils/asyncHandler";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await registerUserService(req.body);

    return ApiResponse.created(res, "User registered successfully", user);
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await loginUserService(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return ApiResponse.ok(res, "Successfully logged in", {
    id: user.id,
    username: user.username,
    email: user.email,
  });
});

export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return ApiResponse.ok(res, "Logged out successfully", null);
});
