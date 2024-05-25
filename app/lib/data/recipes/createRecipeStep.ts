import RecipeStep from "@/app/data/models/RecipeStep"
import { RecipeStepZype } from "../zodels/Recipe"
import _ from "lodash"

export default async function createRecipeStep(recipeStep: RecipeStepZype){
    try {
        await RecipeStep.sync().catch((err) => {
            console.log(err)
        })
        const res = await RecipeStep.findOrCreate({
            where: {
                recipe_id: recipeStep.recipe_id,
                step_number: recipeStep.step_number
            },
            defaults: {
                ...recipeStep
            }
        }).catch(err => {
            console.log(err)
        })
        recipeStep.id = res![0].dataValues.id
        if(!(_.isEqual(recipeStep, res![0].dataValues))){
            res![0].set({
                ...recipeStep
            })
            console.log(`Data diff detected in RecipeStep: ${recipeStep}`)
            await res![0].save()
        }
        return 'res'
    } catch (error) {
        console.log(`There was an error in createRecipeSteps: ${error}`)
    }
}