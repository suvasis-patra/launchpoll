import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").post(logoutUser);
