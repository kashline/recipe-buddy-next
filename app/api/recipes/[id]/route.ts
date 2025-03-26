import getRecipeById from "@/app/data/getRecipeById";
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
    const { searchParams } = new URL(request.url!);
    const userSub = searchParams.get('userSub')
    const recipe = await getRecipeById(Number(slug.id), userSub ? userSub : null)
    return  NextResponse.json({
      data: recipe
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: `There was an error ${error}`,
      },
      { status: 500 }
    );
  }
}
