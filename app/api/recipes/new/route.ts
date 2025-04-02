"use server";

import Ingredient from "@/app/data/models/Ingredient";
import Recipe from "@/app/data/models/Recipe";
import RecipeIngredient from "@/app/data/models/RecipeIngredient";
import RecipeStep from "@/app/data/models/RecipeStep";
import createRecipe from "@/app/lib/data/recipes/createRecipe";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";
import { auth } from "@/auth";

export const POST = async (request: Request) => {
  await Recipe.sync().catch((err) => {
    console.log(err);
  });
  await RecipeStep.sync().catch((err) => {
    console.log(err);
  });
  await Ingredient.sync().catch((err) => {
    console.log(err);
  });
  await RecipeIngredient.sync().catch((err) => {
    console.log(err);
  });
  try {
    const data = RecipeZodel.parse(await request.json());
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
