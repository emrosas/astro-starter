import type { APIContext } from "astro";

export function setSessionTokenCookie(
  context: APIContext,
  token: string,
  expiresAt: Date,
): void {
  context.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export function deleteSessionTokenCookie(context: APIContext): void {
  context.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
