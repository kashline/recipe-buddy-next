import Ingredient from "@/app/data/models/Ingredient";
import Recipe from "@/app/data/models/Recipe";
import RecipeIngredient from "@/app/data/models/RecipeIngredient";
import RecipeRating from "@/app/data/models/RecipeRating";
import RecipeStep from "@/app/data/models/RecipeStep";
import User from "@/app/data/models/User";
import createRecipe from "@/app/lib/data/recipes/createRecipe";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

type RatingRequest = { rating: number; recipeId: number };
type Ratingwith_options = RecipeRating & {
  _options?: any;
};

/**
 *
 * @param request Request
 * @returns NextResponse: {success: bool, status: number, message: string, recipeRating?: RecipeRating}
 */
export const POST = async (request: Request) => {
  await RecipeRating.sync().catch((err) => {
    console.log(err);
  });
  try {
    const { rating, recipeId }: RatingRequest = await request.json();
    const session = await auth();
    const userId = (
      await User.findOne({ where: { email: session?.user?.email } })
    )?.dataValues.id;
    const targetRecipe = await Recipe.findOne({ where: { id: recipeId } });
    if (!session || !userId || targetRecipe === null) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You must be logged in to access this endpoint and provide a valid recipe id",
        },
        { status: 400 },
      );
    }
    const recipeRating: [Ratingwith_options, boolean] =
      await RecipeRating.findOrCreate({
        where: {
          recipeId: recipeId,
          userId: userId,
        },
        defaults: {
          rating: rating,
        },
      });
    if (!recipeRating[0]._options.isNewRecord) {
      recipeRating[0].set({ rating: rating });
      await recipeRating[0].save();
    }
    if (recipeRating) {
      return NextResponse.json(
        {
          success: true,
          recipeRating: recipeRating,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create recipe rating",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
};
