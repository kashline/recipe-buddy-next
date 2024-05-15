import { NextApiRequest, NextApiResponse } from "next"
import { unstable_noStore as noStore } from 'next/cache';
import GetRecipe from "@/app/data/GetRecipe"

export async function GET(request: NextApiRequest, response: NextApiResponse){
    noStore()
    if (request.url?.split('?')[1] === undefined) { 
        return Response.json(await GetRecipe())
    } else {
        const { searchParams } = new URL(request.url!)
        return Response.json(await GetRecipe(searchParams))
    }
}
