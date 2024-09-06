import { NextRequest } from "next/server";
import UserRecipe from "@/app/data/models/UserRecipe";
import { UserRecipeZodel } from "@/app/lib/data/zodels/UserRecipeZodel";

export const POST = async (request: NextRequest) => {
  try {
    const data = UserRecipeZodel.parse(await request.json());
    if (data.recipeId !== undefined || data.recipeId !== null) {
      const res = await UserRecipe.findOrCreate({
        where: {
          UserSub: data.userSub,
          RecipeId: data.recipeId,
        },
      });
      if (!res[1]) {
        const deleteRes = await UserRecipe.destroy({
          where: {
            UserSub: data.userSub,
            RecipeId: data.recipeId,
          },
        });
        return Response.json(
          {
            success: true,
            message: `Successfully deleted recipe ${data.recipeId} from user ${data.userSub}'s favorites.`,
          },
          { status: 200 },
        );
      }
      return Response.json(
        {
          success: true,
          message: `Successfully added recipe ${data.recipeId} to user ${data.userSub}'s favorites.`,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(`There was an error adding a favorite recipe: ${error}`);
    return Response.json(
      {
        success: false,
        message: `There was an error adding or removing a favorite recipe: ${error}`,
      },
      { status: 500 },
    );
  }
};
