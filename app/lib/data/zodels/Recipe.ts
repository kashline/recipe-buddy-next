import { z } from 'zod'

const IngredientZodel = z.object({
    id: z.number().optional(),
    name: z.string({required_error: `"name" is required`}).toLowerCase().trim(),
    quantity: z.string({required_error: `"quantity" is required`})
})

export const RecipeStepZodel = z.object({
    id: z.number().optional(),
    step: z.string(),
    recipe_id: z.number().optional(),
    step_number: z.number()
})

export const RecipeIngredientZodel = z.object({
    id: z.number().optional(),
    quantity: z.string(),
    recipe_id: z.number(),
    ingredient_id: z.number()
})

export const RecipeZodel = z.object({
    id: z.number().optional(),
    name: z.string({required_error: `"name" is required`}).toLowerCase().trim(),
    difficulty: z.string({required_error: `"difficulty" is required`}),
    length: z.string({required_error: `"length" is required`}),
    mealdb_id: z.string().optional(),
    image: z.string().optional(),
    video: z.string().optional(),
    ingredients: z.array(IngredientZodel),
    steps: z.array(RecipeStepZodel)
})

export type RecipeZype = z.infer<typeof RecipeZodel>
export type IngredientZype = z.infer<typeof IngredientZodel>
export type RecipeIngredientZype = z.infer<typeof RecipeIngredientZodel>
export type RecipeStepZype = z.infer<typeof RecipeStepZodel>
