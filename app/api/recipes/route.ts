import GetRecipe from "@/app/data/GetRecipe"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    // try {
        if (request.url?.split('?')[1] === undefined) { 
            console.log('asdf')
            return parseResponse(await GetRecipe())
            
        } else {
            const { searchParams } = new URL(request.url!)
            const recipes = await GetRecipe(searchParams)
            return parseResponse(recipes)
        }
    // } catch (error) {
    //     return Response.json({status: 500, error: error})
    // }
}

function parseResponse(res: any){
    return Response.json(JSON.parse(JSON.stringify(res, (key, value) => {
        return value instanceof Map ? [...value] : value
    })))
}
