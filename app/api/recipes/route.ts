import GetRecipe from "@/app/data/GetRecipe"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    if (request.url?.split('?')[1] === undefined) { 
        return Response.json(await GetRecipe())
    } else {
        const { searchParams } = new URL(request.url!)
        const res = await GetRecipe(searchParams)
        return Response.json(JSON.parse(JSON.stringify(res, (key, value) => {
            return value instanceof Map ? [...value] : value
        })))
    }
}
