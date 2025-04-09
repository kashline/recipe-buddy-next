import { NextRequest, NextResponse } from "next/server";
import * as htmlparser2 from "htmlparser2";
import { RecipeZodel } from "@/app/lib/data/zodels/Recipe";
import validateImport from "@/app/api/import/validateimport";
import User from "@/app/data/models/User";
import RecipeComment from "@/app/data/models/RecipeComment";

export async function POST(req: NextRequest) {
  try {
    await RecipeComment.sync();
    const { comment, user, recipeId } = await req.json();
    const userId = await User.findOne({ where: { email: user.email } });
    if (!userId) {
      return NextResponse.json({ error: "Cannot find user!" }, { status: 400 });
    }
    const res = await RecipeComment.create({
      userId: userId.dataValues.id,
      recipeId: recipeId,
      comment: comment,
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
