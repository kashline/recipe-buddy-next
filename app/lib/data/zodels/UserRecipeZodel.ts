import { z } from "zod";

export const UserRecipeZodel = z.object({
  id: z.number().optional(),
  recipeId: z.number().optional(),
  userSub: z.string().optional(),
});

export type UserZype = z.infer<typeof UserRecipeZodel>;
