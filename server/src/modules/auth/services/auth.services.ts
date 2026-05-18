import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import {
  ZloginUser,
  ZregisterUser,
  type LoginUserInput,
  type RegisterUserInput,
} from "../utils/validation";
import { db } from "../../../common/db/db";
import { usersTable } from "../schemas/user";
import ApiError from "../../../common/utils/apiError";
import { generateToken } from "../utils/lib";

export const registerUserService = async (userData: RegisterUserInput) => {
  const parsedUserData = ZregisterUser.safeParse(userData);

  if (!parsedUserData.success) {
    throw ApiError.badRequest("Invalid user data");
  }

  const { username, email, password } = parsedUserData.data;

  const normalizedEmail = email.toLowerCase();

  const [exist] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (exist) {
    throw ApiError.conflict("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db
    .insert(usersTable)
    .values({
      username,
      email: normalizedEmail,
      password: hashedPassword,
    })
    .returning({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
      profileImage: usersTable.profileImage,
      createdAt: usersTable.createdAt,
    });

  return newUser;
};

export const loginUserService = async (userData: LoginUserInput) => {
  const parsedUserData = ZloginUser.safeParse(userData);
  if (!parsedUserData.success) {
    throw ApiError.badRequest("Invalid user data");
  }
  const { email, password } = parsedUserData.data;
  const normalizedEmail = email.toLowerCase();
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, normalizedEmail));
  if (!user) {
    throw ApiError.unauthorized("Invalid credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw ApiError.unauthorized("Invalid credentials");
  }
  const token = generateToken({
    sub: user.id,
    email: user.email,
    username: user.username,
  });
  return { user, token };
};
