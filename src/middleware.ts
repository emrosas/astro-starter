import { defineMiddleware } from "astro:middleware";
import { validateSessionToken } from "./lib/sessions";

// Middleware for session validation
export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("session")?.value ?? null;

  if (token === null) {
    context.locals.user = null;
    context.locals.session = null;
    return next();
  }

  try {
    const { session, user } = await validateSessionToken(token);

    if (!session || !user) {
      // If session or user is invalid, clear the cookie
      context.cookies.delete("session", {
        path: "/",
      });

      context.locals.user = null;
      context.locals.session = null;
      return context.redirect("/login");
    }

    context.locals.session = session;
    context.locals.user = user;
  } catch {
    // Clear cookie on any validation error
    context.cookies.delete("session", {
      path: "/",
    });

    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});
