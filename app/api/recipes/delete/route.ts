import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import DeleteRecipe from "@/app/data/DeleteRecipe";
import { NextRequest } from "next/server";

export const DELETE = withApiAuthRequired(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url!);
    const id = searchParams.get("id");
    const res = await DeleteRecipe(Number(id));
    return Response.json(
      { success: true, message: JSON.stringify(res) },
      { status: 200 },
    );
  } catch (error) {
    console.log(`There was an error in /api/recipes/delete: ${error}`);
    return Response.json({ success: false, message: error }, { status: 500 });
  }
});
