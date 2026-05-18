import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "../schemas/user";

export const ZregisterUser = createInsertSchema(usersTable, {
  username: (schema) =>
    schema.min(3, "Username too short").max(30, "Username too long"),

  email: () => z.email("Invalid email"),

  password: () => z.string().min(8, "Password must be at least 8 chars"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ZloginUser = createInsertSchema(usersTable, {
  email: () => z.email("Invalid email address"),

  password: () => z.string("Password is required"),
})
  .pick({
    email: true,
    password: true,
  })
  .strict();

export type RegisterUserInput = z.infer<typeof ZloginUser>;
export type LoginUserInput = z.infer<typeof ZloginUser>;
