'use server'

import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export default async function fetchRecipes(query: string){
    if (query){
        const res = await fetch(`http://localhost:3001/data/recipes?name=${query}`)
        const recipes = await res.json()
        return recipes
    } else {
        const res = await fetch(`http://localhost:3001/data/recipes/all`)
        const recipes = await res.json()
        return recipes
    }
}