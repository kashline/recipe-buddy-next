"use server";

import createRecipe from "@/app/lib/data/recipes/createRecipe";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";
import { auth0 } from "../../../../lib/auth0";

export const POST = async (request: Request) => {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return Response.json({
        success: false,
        message: "You must be logged in to access this endpoint",
        status: 401,
      });
    }
    const data = RecipeZodel.parse(await request.json());
    const recipe = await createRecipe(data);
    return Response.json({ success: true, Recipe: recipe }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: error }, { status: 500 });
  }
};
