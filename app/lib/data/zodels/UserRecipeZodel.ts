import { z } from "zod";

export const UserRecipeZodel = z.object({
  id: z.number().optional(),
  recipeId: z.number(),
  userId: z.number(),
});

export type UserZype = z.infer<typeof UserRecipeZodel>;
