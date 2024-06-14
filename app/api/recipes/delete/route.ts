import Ingredient from "@/app/data/models/Ingredient"
import { Op } from "sequelize"
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest } from "next";
import DeleteRecipe from "@/app/data/DeleteRecipe";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";

export const DELETE = withApiAuthRequired(async (request: NextApiRequest) => {
    try {
        const { searchParams } = new URL(request.url!)
        const id = searchParams.get('id');
        const res = await DeleteRecipe(Number(id))
        return (Response.json({success: true, message: JSON.stringify(res)}, {status: 200}))
    } catch (error) {
        console.log(`There was an error in /api/recipes/delete: ${error}`)
        return Response.json(({success: false, message: error}), {status: 500})
    }
})