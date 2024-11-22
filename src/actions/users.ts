import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { signup } from "../lib/users";
import { setSessionTokenCookie } from "../lib/cookies";
import type { APIContext } from "astro";

export const users = {
  signup: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(128),
    }),
    handler: async ({ email, password }, context) => {
      const session = await signup(email, password);
      if (session === null) {
        return {
          success: false,
          message: "User already exists",
        };
      }
      setSessionTokenCookie(
        context as APIContext,
        session.id,
        session.expiresAt,
      );
      context.cookies.set("session", session.id, {
        httpOnly: true,
        sameSite: "lax",
        expires: session.expiresAt,
        path: "/",
      });
      return {
        success: true,
        message: "User created",
      };
    },
  }),
};
