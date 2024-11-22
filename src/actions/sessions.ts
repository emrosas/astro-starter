import { defineAction } from "astro:actions";
import { generateSessionToken } from "../lib/sessions";

export const sessions = {
  create: defineAction({
    handler: async () => {
      const token = generateSessionToken();
      return token;
    },
  }),
};
