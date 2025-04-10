import RecipeRating from "@/app/data/models/RecipeRating";
import User from "@/app/data/models/User";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const session = await auth();
    const { id } = await params;
    const userId = (
      await User.findOne({ where: { email: session?.user?.email } })
    )?.dataValues.id;
    const recipeRating = await RecipeRating.findOne({
      where: { recipeId: id, userId: userId },
    });
    if (!recipeRating) {
      return NextResponse.json(
        {
          data: { message: "No valid rating" },
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        data: recipeRating?.dataValues,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: `There was an error ${error}`,
      },
      { status: 500 }
    );
  }
}
