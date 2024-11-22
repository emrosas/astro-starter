import { db, eq, Users } from "astro:db";
import { type Session, type User } from "../../db/config";
import { Argon2id } from "oslo/password";
import { generateRandomInteger, random } from "oslo/crypto";
import { createSession, generateSessionToken } from "./sessions";

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
  const user: User = {
    id: generateRandomInteger(32),
    email,
    password: await hashPassword(password),
  };
  await db.insert(Users).values(user);
  const session = await createSession(generateSessionToken(), user.id);
  return session;
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
