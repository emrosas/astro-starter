import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { generateSessionToken } from "../lib/sessions";

export const sessions = {
  create: defineAction({
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(128),
    }),
    handler: async (input) => {
      const token = generateSessionToken();
    },
  }),
};
