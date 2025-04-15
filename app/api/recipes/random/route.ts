import getRecipeById from "@/app/data/getRecipeById";
import Recipe from "@/app/data/models/Recipe";
import { NextResponse } from "next/server";
import { Sequelize } from "sequelize";

/**
 *
 * @returns NextResponse {status: number, message?: string, recipe?: Recipe | null}
 */
export async function GET() {
  try {
    const recipe = await Recipe.findOne({
      order: [Sequelize.fn("RANDOM")],
      limit: 1,
    });
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
