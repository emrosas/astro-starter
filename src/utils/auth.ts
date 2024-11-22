import { User, Session } from "../../db/config";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export function createSession(token: string, userId: number): Session {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  db.execute(
    "INSERT INTO session (id, user_id, expires_at) VALUES (?, ?, ?)",
    session.id,
    session.userId,
    Math.floor(session.expiresAt.getTime() / 1000),
  );
  return session;
}

export function validateSessionToken(token: string): SessionValidationResult {
  // TODO
}

export function invalidateSession(sessionId: string): void {
  // TODO
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
