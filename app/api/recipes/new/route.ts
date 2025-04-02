"use server";

import Recipe from "@/app/data/models/Recipe";
import createRecipe from "@/app/lib/data/recipes/createRecipe";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";
import { auth } from "@/auth";

export const POST = async (request: Request) => {
  try {
    console.log(request)
    const data = RecipeZodel.parse(await request.json());
    console.log(data)
    const session = await auth();
    const targetRecipe = await Recipe.findOne({ where: { id: data.id } });
    if (
      !session ||
      (targetRecipe !== null &&
        targetRecipe?.dataValues.owner !== session.user?.email)
    ) {
      return Response.json({
        success: false,
        message: "You must be logged in to access this endpoint",
        status: 401,
      });
    }
    const recipe = await createRecipe(data);
    return Response.json({ success: true, Recipe: recipe }, { status: 200 });
  } catch (error) {
    console.log(error)
    return Response.json({ success: false, message: error }, { status: 500 });
  }
};
