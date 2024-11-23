import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { login, signup } from "../lib/users";
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from "../lib/cookies";
import type { APIContext } from "astro";
import { invalidateSession, validateSessionToken } from "../lib/sessions";

export const users = {
  signup: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(128),
      name: z.string().min(3).max(64).toLowerCase(),
      phone: z.string().regex(/^\d{10}$/),
    }),
    handler: async ({ email, password, name, phone }, context) => {
      const session = await signup(email, password, name, phone);
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

      const { user } = await validateSessionToken(session.id);

      if (user === null) {
        return {
          success: false,
          message: "Error creating user",
        };
      }

      // Set locals for middleware
      context.locals.session = session;
      context.locals.user = user;

      return {
        success: true,
        message: "User created",
        user: {
          id: user.id,
          email: user.email,
        },
      };
    },
  }),

  login: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(128),
    }),
    handler: async ({ email, password }, context) => {
      const session = await login(email, password);
      if (session === null) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      }
      setSessionTokenCookie(
        context as APIContext,
        session.id,
        session.expiresAt,
      );

      const { user } = await validateSessionToken(session.id);

      if (user === null) {
        return {
          success: false,
          message: "Error logging in",
        };
      }

      context.locals.session = session;
      context.locals.user = user;

      return {
        success: true,
        message: "User logged in",
        user: {
          id: user.id,
          email: user.email,
        },
      };
    },
  }),
  logout: defineAction({
    handler: async (_, context) => {
      console.log("Logging out");
      const token = context.cookies.get("session")?.value ?? null;

      if (token) {
        console.log("Clearing session:", token);
        invalidateSession(token);
        deleteSessionTokenCookie(context as APIContext);
      }

      context.locals.session = null;
      context.locals.user = null;

      return {
        success: true,
        message: "User logged out",
        redirect: "/login",
      };
    },
  }),
};
