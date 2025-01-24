import { findRecipeById } from "@/app/data/GetRecipe";
import { parseResponse } from "@/app/lib/utils/parseResponse";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const attributes: string[] = [
      "title",
      "difficulty",
      "preparationTime",
      "cookingTime",
      "image",
      "video",
      "id",
      "description",
      "owner",
      "aigenerated",
    ];
    const slug = await params;
    const recipe = await findRecipeById(
      [Number(slug.id)],
      1,
      false,
      attributes,
      1
    );
    return parseResponse(recipe);
  } catch (error) {
    return NextResponse.json(
      {
        message: `There was an error ${error}`,
      },
      { status: 500 }
    );
  }
}
