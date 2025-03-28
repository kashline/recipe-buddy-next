// import GetRecipe from "@/app/data/GetRecipe";
import { parseResponse } from "@/app/lib/utils/parseResponse";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (request.url?.split("?")[1] === undefined) {
    // return parseResponse(await GetRecipe());
  } else {
    const { searchParams } = new URL(request.url!);
    // const recipes: any = await GetRecipe(searchParams);
    // return parseResponse(recipes);
    return Response.json({ status: 200 });
  }
}
