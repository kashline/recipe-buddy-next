import { z } from "zod";

// WIP
export const BuddyRequest = z.object({
  query: z.string(),
});

export type BuddyRequestZype = z.infer<typeof BuddyRequest>;
