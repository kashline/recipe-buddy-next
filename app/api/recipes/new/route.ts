'use server'

import createRecipe from '@/app/lib/data/recipes/createRecipe';
import { RecipeZodel } from '@/app/lib/data/zodels/Recipe';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export const POST = withApiAuthRequired(async (request: Request) => {
    try {
        const data = RecipeZodel.parse(await request.json())
        const recipe = await createRecipe(data)
        return (Response.json({success: true, Recipe: recipe}, {status: 200}))
    } catch (error) {
        return Response.json(({success: false, message: error}), {status: 500})
    }
})
