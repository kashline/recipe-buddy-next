import { z } from "zod";

export const RecipeIngredientZodel = z.object({
  id: z.number().optional(),
  quantity: z.string(),
  recipe_id: z.number().optional(),
  ingredient_id: z.number().optional(),
  name: z.string().optional(),
});

const IngredientZodel = z.object({
  id: z.number().optional(),
  name: z.string({ required_error: `"name" is required` }).toLowerCase().trim(),
  RecipeIngredient: RecipeIngredientZodel,
  // quantity: z.string({required_error: `"quantity" is required`})
});

export const RecipeStepZodel = z.object({
  id: z.number().optional(),
  step: z.string(),
  recipe_id: z.number().optional(),
  step_number: z.number(),
});

export const RecipeZodel = z.object({
  id: z
    .number()
    .nullish()
    .transform((x) => x ?? null),
  name: z.string({ required_error: `"name" is required` }).toLowerCase().trim(),
  difficulty: z.string({ required_error: `"difficulty" is required` }),
  length: z.string({ required_error: `"length" is required` }),
  mealdb_id: z
    .string()
    .nullish()
    .transform((x) => x ?? null),
  image: z
    .string()
    .nullish()
    .transform((x) => x ?? null),
  video: z
    .string()
    .nullish()
    .transform((x) => x ?? null),
  Ingredients: z.array(IngredientZodel),
  RecipeSteps: z.array(RecipeStepZodel).transform((steps) =>
    steps.map((step, index) => {
      return {
        ...step,
        step_number: index + 1,
      };
    }),
  ),
});

export type RecipeZype = z.infer<typeof RecipeZodel>;
export type IngredientZype = z.infer<typeof IngredientZodel>;
export type RecipeIngredientZype = z.infer<typeof RecipeIngredientZodel>;
export type RecipeStepZype = z.infer<typeof RecipeStepZodel>;
