import { db, eq, Users } from "astro:db";
import { type User } from "../../db/config";
import { Argon2id } from "oslo/password";
import { random } from "oslo/crypto";

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

export async function createUser(
  email: string,
  password: string,
): Promise<User> {
  const user: User = {
    id: random(),
    email,
    password: await hashPassword(password),
  };
  await db.insert(Users).values(user);
  return user;
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
