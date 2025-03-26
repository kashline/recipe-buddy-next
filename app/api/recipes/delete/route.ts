import DeleteRecipe from "@/app/data/DeleteRecipe";
import { NextRequest } from "next/server";
import { auth0 } from "../../../../lib/auth0";

export const DELETE = async (request: NextRequest) => {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return Response.json({
        success: false,
        message: "You must be logged in to access this endpoint",
        status: 401,
      });
    }
    const { searchParams } = new URL(request.url!);
    const id = searchParams.get("id");
    // const res = await DeleteRecipe(Number(id));
    return Response.json(
      { success: true, message: JSON.stringify('res') },
      { status: 200 }
    );
  } catch (error) {
    console.log(`There was an error in /api/recipes/delete: ${error}`);
    return Response.json({ success: false, message: error }, { status: 500 });
  }
};
