import GetRecipe from "@/app/data/GetRecipe"
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    if (request.url?.split('?')[1] === undefined) { 
        return parseResponse(await GetRecipe())
    } else {
        const { searchParams } = new URL(request.url!)
        const session = await getSession();
        const user = session?.user
        console.log(request.headers)
        console.log(user)
        return parseResponse(await GetRecipe(searchParams))
    }
}

function parseResponse(res: any){
    return Response.json(JSON.parse(JSON.stringify(res, (key, value) => {
        return value instanceof Map ? [...value] : value
    })))
}
