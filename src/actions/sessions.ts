import { defineAction } from "astro:actions";
import { invalidateSession } from "../lib/sessions";
import { deleteSessionTokenCookie } from "../lib/cookies";

export const sessions = {
  delete: defineAction({
    handler: async (context) => {
      if (context.locals.session === null) {
        return {
          success: false,
          message: "Not authenticated",
        };
      }
      invalidateSession(context.locals.session.id);
      deleteSessionTokenCookie(context);
      return {
        success: true,
        message: "Session deleted",
      };
    },
  }),
};
