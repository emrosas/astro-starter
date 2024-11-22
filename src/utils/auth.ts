// import type { Session, User } from "../../db/config";
// import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
//
// export function generateSessionToken(): string {
//   const bytes = new Uint8Array(20);
//   crypto.getRandomValues(bytes);
//   const token = encodeBase32LowerCaseNoPadding(bytes);
//   return token;
// }
//
// export function createSession(token: string, userId: number): Session {
//   // Ttype ODO
// }
//
// export function validateSessionToken(token: string): SessionValidationResult {
//   // TODO
// }
//
// export function invalidateSession(sessionId: string): void {
//   // TODO
// }
//
// export type SessionValidationResult =
//   | { session: Session; user: User }
//   | { session: null; user: null };
