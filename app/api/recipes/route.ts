import GetRecipe from "@/app/data/GetRecipe";
import UserRecipe from "@/app/data/models/UserRecipe";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: NextRequest) {
  await UserRecipe.sync();
  const session = await getSession();
  //   console.log(`${session} asdfasf`)
  if (session === null) {
    // console.log('asdf')
  }
  if (request.url?.split("?")[1] === undefined) {
    return parseResponse(await GetRecipe());
  } else {
    const { searchParams } = new URL(request.url!);
    const recipes = await GetRecipe(searchParams);
    return parseResponse(recipes);
  }
}

function parseResponse(res: any) {
  return Response.json(
    JSON.parse(
      JSON.stringify(res, (key, value) => {
        return value instanceof Map ? [...value] : value;
      }),
    ),
  );
}
