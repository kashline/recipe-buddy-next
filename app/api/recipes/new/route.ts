'use server'

import createRecipe from "@/app/lib/data/recipes/createRecipe";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";

export async function POST(request: Request){
    try {
        // const data = RecipeZodel.parse(await request.json())
        // const recipe = await createRecipe(data)
        // data.id = recipe?.dataValues.id
        return Response.json(('not supported'))
    } catch (error) {
        return Response.json(({"error": error}))
    }
}
