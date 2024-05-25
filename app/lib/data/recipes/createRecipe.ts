import Recipe from "@/app/data/models/Recipe"
import { RecipeZype, RecipeIngredientZodel, RecipeStepZodel } from "../zodels/Recipe"
import createIngredient from "./createIngredients"
import createRecipeIngredient from "./createRecipeIngredient"
import createRecipeStep from "./createRecipeStep"

export default async function createRecipe(recipe: RecipeZype){
    try {
        await Recipe.sync().catch((err) => {
            console.log(err)
        })
        const res = await Recipe.findOrCreate({
            where: {name: recipe.name},
            defaults: {
                name: recipe.name,
                length: recipe.length,
                difficulty: recipe.difficulty,
                mealdb_id: recipe.mealdb_id || undefined,
                image: recipe.image || undefined,
                video: recipe.video || undefined
            }
        }).catch(err => {
            console.log(err)
        })
        recipe.id = res![0].dataValues.id
        if (res![0]._options.isNewRecord){
            console.log(`New recipe! ${res![0].name}`)
        }
        if(res![0].difficulty != recipe.difficulty || res![0].length != recipe.length || res![0].mealdb_id != recipe.mealdb_id || res![0].image != recipe.image || res![0].video != recipe.video){
            res![0].set({ 
                ...recipe
            })
            console.log(`Data diff detected in ${res![0].name}`)
            await res![0].save()
        }
        recipe.ingredients.map(async (ingredient) => {
            const res = await createIngredient(ingredient)
            await createRecipeIngredient(RecipeIngredientZodel.parse({
                quantity: ingredient.quantity,
                recipe_id: recipe.id,
                ingredient_id: res?.dataValues.id
            }))
        })
        recipe.steps.map(async (step) => {
            await createRecipeStep(RecipeStepZodel.parse({
                step: step.step,
                recipe_id: recipe.id,
                step_number: step.step_number
            }))
        })
        return res![0]
    } catch (error) {
        console.log(`There was an error in createRecipe: ${error}`)
    }
}
