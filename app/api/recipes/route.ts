import GetRecipe from "@/app/data/GetRecipe"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    if (request.url?.split('?')[1] === undefined) { 
        return Response.json(await GetRecipe())
    } else {
        const { searchParams } = new URL(request.url!)
        return Response.json(await GetRecipe(searchParams))
    }
}
