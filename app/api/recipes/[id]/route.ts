import getRecipeById from "@/app/data/getRecipeById";
import { NextResponse } from "next/server";
import Recipe from "@/app/data/models/Recipe";
import { auth } from "@/auth";

/**
 *
 * @param request Request
 * @param param1 {id: number}
 * @returns Response {success: bool, message: string, status: number}
 */
export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) => {
  try {
    const slug = await params;
    const session = await auth();
    const id = slug.id;
    const recipe = await Recipe.findOne({ where: { id: id } });
    if (!session || recipe?.dataValues.owner !== session.user?.email) {
      return Response.json({
        success: false,
        message: "You must be logged in to access this endpoint",
        status: 401,
      });
    } else {
      const res = Recipe.destroy({ where: { id: id } });
      return Response.json(
        { success: true, message: JSON.stringify("res") },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(`There was an error in /api/recipes/delete: ${error}`);
    return Response.json({ success: false, message: error }, { status: 500 });
  }
};

/**
 *
 * @param request Request
 * @param param1 {id: string}
 * @returns NextResponse {status: number, data?: Recipe, message: string}
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const slug = await params;
    const { searchParams } = new URL(request.url!);
    const userSub = searchParams.get("userSub");
    const recipe = await getRecipeById(
      Number(slug.id),
      userSub ? userSub : null,
    );
    return NextResponse.json(
      {
        data: recipe,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `There was an error ${error}`,
      },
      { status: 500 },
    );
  }
}
