import { z } from "zod";
import { UserRecipeZodel } from "./UserRecipeZodel";

export const RecipeIngredientZodel = z.object({
  id: z.number().optional(),
  quantity: z.string(),
  recipe_id: z.number().optional(),
  ingredient_id: z.number().optional(),
});

export const IngredientZodel = z.object({
  id: z.number().optional(),
  name: z.string({ required_error: `"name" is required` }).toLowerCase().trim(),
  tags: z.array(z.string()).optional(),
  RecipeIngredient: RecipeIngredientZodel,
});

export const RecipeStepZodel = z.object({
  id: z.number().optional(),
  description: z.string(),
  recipe_id: z.number().optional(),
  step_number: z.number(),
  ingredients: z.array(z.string()).optional()
});

export const RecipeZodel = z.object({
  id: z
    .number()
    .nullish()
    .transform((x) => x ?? null),
  title: z.string({ required_error: `"name" is required` }).toLowerCase().trim(),
  description: z.string({required_error: 'description is required'}),
  difficulty: z.string({ required_error: `"difficulty" is required` }),
  preparationTime: z.string({required_error: 'preparationTime is required'}),
  cookingTime: z.string({required_error: 'cookingTime is required'}),
  image: z
    .string()
    .nullish()
    .transform((x) => x ?? null),
  video: z
    .string()
    .nullish()
    .transform((x) => x ?? null),
  tags: z.array(z.string()),
  servings: z.number({required_error: 'number of servings is required'}),
  Ingredients: z.array(IngredientZodel),
  RecipeSteps: z.array(RecipeStepZodel).transform((steps) =>
    steps.map((step, index) => {
      return {
        ...step,
        step_number: index + 1,
      };
    }),
  ),
  UserRecipes: z.array(UserRecipeZodel),
});

export type RecipeZype = z.infer<typeof RecipeZodel>;
export type IngredientZype = z.infer<typeof IngredientZodel>;
export type RecipeIngredientZype = z.infer<typeof RecipeIngredientZodel>;
export type RecipeStepZype = z.infer<typeof RecipeStepZodel>;
