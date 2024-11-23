import { db, eq, Sessions, Users } from "astro:db";
import { type Session, type User } from "../../db/config";
import { Argon2id } from "oslo/password";
import { generateRandomInteger } from "oslo/crypto";
import { createSession, generateSessionToken } from "./sessions";
import type { APIContext } from "astro";
import { deleteSessionTokenCookie } from "./cookies";

const hasher = new Argon2id();

export async function hashPassword(password: string): Promise<string> {
  return await hasher.hash(password);
}

export async function verifyPassword(
  hashedPassword: string,
  password: string,
): Promise<boolean> {
  return await hasher.verify(hashedPassword, password);
}

export async function signup(
  email: string,
  password: string,
): Promise<Session | null> {
  try {
    const userId = generateRandomInteger(32);
    const hashedPassword = await hashPassword(password);

    const user: User = {
      id: userId,
      email,
      password: hashedPassword,
    };

    await db.insert(Users).values(user);

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, userId);
    //
    // Log detailed information
    console.log("Signup process:", {
      userId,
      email,
      sessionToken,
      session,
    });
    return session;
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
}

export async function validateUserCredentials(
  email: string,
  password: string,
): Promise<User | null> {
  const user = await db.select().from(Users).where(eq(Users.email, email));
  if (user.length < 1) {
    return null;
  }
  if (await verifyPassword(user[0].password, password)) {
    return user[0];
  }
  return null;
}

export async function login(
  email: string,
  password: string,
): Promise<Session | null> {
  const user = await validateUserCredentials(email, password);
  if (user) {
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    return session;
  }
  return null;
}
