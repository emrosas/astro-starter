import { db, eq, Users, Sessions } from "astro:db";
import type { User, Session } from "../../db/config";

import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export function generateSessionId(token: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session | null> {
  try {
    //Generate SessionId and create session
    const sessionId = generateSessionId(token);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    const session: Session = {
      id: sessionId,
      userId,
      expiresAt,
    };

    await db
      .insert(Sessions)
      .values(session)
      .catch((error) => {
        console.error("Error inserting session:", error);
      });
    return session;
  } catch (error) {
    console.error("Error creating session:", error);
    return null;
  }
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  try {
    // Fetch the session
    const session = await db
      .select()
      .from(Sessions)
      .where(eq(Sessions.id, token))
      .get();

    // Log session query result
    console.log("Session query result:", session);

    // If no session found, return null
    if (!session) {
      console.log("No session found for token:", token);
      return { session: null, user: null };
    }

    // Check session expiration
    const now = Date.now();
    if (now >= session.expiresAt.getTime()) {
      console.log("Session expired");

      // Delete expired session
      await db.delete(Sessions).where(eq(Sessions.id, session.id));

      return { session: null, user: null };
    }

    // Fetch associated user
    const user = await db
      .select()
      .from(Users)
      .where(eq(Users.id, session.userId))
      .get();

    console.log("User query result:", user);

    // If no user found, consider session invalid
    if (!user) {
      console.log("No user found for session");

      // Optionally delete the orphaned session
      await db.delete(Sessions).where(eq(Sessions.id, session.id));

      return { session: null, user: null };
    }

    // Optional: Extend session if close to expiration
    const extensionThreshold = 1000 * 60 * 60 * 24 * 15; // 15 days
    if (session.expiresAt.getTime() - now < extensionThreshold) {
      const newExpiresAt = new Date(now + 1000 * 60 * 60 * 24 * 30); // Extend by 30 days

      await db
        .update(Sessions)
        .set({ expiresAt: newExpiresAt })
        .where(eq(Sessions.id, session.id));

      session.expiresAt = newExpiresAt;
    }

    return {
      session,
      user,
    };
  } catch (error) {
    console.error("Session validation error:", error);
    return { session: null, user: null };
  }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(Sessions).where(eq(Sessions.id, sessionId));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
