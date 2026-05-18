import type { JwtPayload } from "jsonwebtoken";

export interface JwtClaims extends JwtPayload {
  sub: string;
  username: string;
  email: string;
}
