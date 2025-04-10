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
  // This needs to be an array of objects!!!
  ingredients: z.array(z.string()).optional(),
});

export const RecipeCommentZodel = z.object({
  id: z.number().optional(),
  userId: z.number(),
  recipeId: z.number(),
  comment: z.string(),
});

export const RecipeRatingZodel = z.object({
  id: z.number().optional(),
  userId: z.number(),
  recipeId: z.number(),
  rating: z.number(),
});

export const RecipeZodel = z.object({
  id: z
    .number()
    .nullish()
    .transform((x) => x ?? null),
  title: z
    .string({ required_error: `"name" is required` })
    .toLowerCase()
    .trim(),
  description: z.string({ required_error: "description is required" }),
  difficulty: z.string().optional(),
  preparationTime: z.number({ required_error: "preparationTime is required" }),
  cookingTime: z.number({ required_error: "cookingTime is required" }),
  image: z
    .string()
    .nullish()
    .transform((x) => x ?? null),
  video: z
    .string()
    .nullish()
    .transform((x) => x ?? null),
  tags: z.array(z.string()),
  servings: z.number({ required_error: "number of servings is required" }),
  owner: z.string({ required_error: "Recipe owner is required." }).optional(),
  aigenerated: z.boolean().optional(),
  Ingredients: z.array(IngredientZodel).optional(),
  RecipeSteps: z
    .array(RecipeStepZodel)
    .transform((steps) =>
      steps.map((step, index) => {
        return {
          ...step,
          step_number: index + 1,
        };
      })
    )
    .optional(),
  UserRecipes: z.array(UserRecipeZodel).optional(),
  RecipeComments: z.array(RecipeCommentZodel).optional(),
  RecipeRatings: z.array(RecipeRatingZodel).optional(),
});

export type RecipeZype = z.infer<typeof RecipeZodel>;
export type IngredientZype = z.infer<typeof IngredientZodel>;
export type RecipeIngredientZype = z.infer<typeof RecipeIngredientZodel>;
export type RecipeStepZype = z.infer<typeof RecipeStepZodel>;
