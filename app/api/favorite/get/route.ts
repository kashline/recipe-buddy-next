import User from "@/app/data/models/User";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

export const GET = async function (request: NextRequest) {
  const session = await getSession();
  const user = session?.user;
  const userId = request.nextUrl.searchParams.get("UserId") as string;
  const recipeId = request.nextUrl.searchParams.get("RecipeId") as string;
  if (user === undefined) {
    return Response.json(
      { success: false, message: `No valid user session!` },
      { status: 403 },
    );
  }
  const auth0Id = await User.findOne({
    where: {
      auth0Id: user.sub,
    },
  });
  if (user === undefined || user.sub !== userId) {
    return Response.json({
      success: false,
      message: `User sub ID doesn't match provided user ID!`,
    });
  }
  if (userId !== undefined && recipeId !== undefined) {
  }
};
