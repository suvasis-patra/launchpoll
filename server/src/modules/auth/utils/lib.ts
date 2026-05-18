import jwt from "jsonwebtoken";
import type { JwtClaims } from "./types";

export const generateToken = (payload: JwtClaims) => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};
