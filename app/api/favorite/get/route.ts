import User from "@/app/data/models/User";
import { NextRequest } from "next/server";
import UserRecipe from "../../../data/models/UserRecipe";
import { auth } from "@/auth";

export const GET = async function (request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const recipeId = request.nextUrl.searchParams.get("RecipeId") as string;
  if (user === undefined) {
    return Response.json(
      { success: false, message: `No valid user session!` },
      { status: 403 },
    );
  }
  const favorited = await UserRecipe.findOne({
    where: { UserEmail: user.email, RecipeId: recipeId },
  });
  if (!favorited?.dataValues) {
    return Response.json({
      success: false,
      message: `User sub ID doesn't match provided user ID!`,
    });
  }
  return Response.json({
    success: true,
    message: "",
  });
};
