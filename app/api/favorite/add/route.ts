import { NextRequest } from "next/server";
// import { UserRecipe } from "@/app/data/models/Relationships";
import UserRecipe from "@/app/data/models/UserRecipe";
import { UserRecipeZodel } from "@/app/lib/data/zodels/UserRecipeZodel";
import User from "@/app/data/models/User";

export const POST = async (request: NextRequest) => {
  try {
    const data = UserRecipeZodel.parse(await request.json());
    if (data.recipeId !== undefined || data.recipeId !== null) {
      await UserRecipe.sync();
      //   const userId = await User.findOne({
      //     where: {
      //       auth0Id: data.userId,
      //     },
      //   });
      //   if (userId !== null) {
      const res = await UserRecipe.findOrCreate({
        where: {
          // UserId: userId.dataValues.id,
          UserId: data.userId,
          RecipeId: data.recipeId,
        },
      });
      //   }
      return Response.json(
        {
          success: true,
          message: `Successfully added recipe ${data.recipeId} to user ${data.userId}'s favorites.`,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(`There was an error adding a favorite recipe: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error adding a favorite recipe: ${error}`,
      },
      { status: 500 },
    );
  }
};
