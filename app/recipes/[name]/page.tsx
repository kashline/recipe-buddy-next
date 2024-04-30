import fetchRecipes from "@/app/lib/data/actions/fetchRecipes";
import Image from "next/image";
import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from "react";

export default async function Page({params}: {params: {name: string}}){
    noStore()
    const recipeData = await fetchRecipes(params.name)
    const recipe = recipeData[0]
    const friendlyName = decodeURI(params.name).split(" ").map((word) => {return `${word[0].toUpperCase()}${word.substring(1)}`}).join(" ")
    return(
        <div>
            <div className="flex">
                <Suspense fallback='/chef-icon.png'>
                    <Image
                        src={recipe.image || '/chef-icon.png'}
                        className="mr-2"
                        width={250}
                        height={250}
                        alt={`Delicious ${friendlyName}`}
                        />
                </Suspense>
                <table>
                    <tbody>
                        <tr className="text-center">
                            <th className="text-center">Recipe Information</th>
                        </tr>
                        <tr>
                            <td>Difficulty</td>
                            <td>{recipe.difficulty}</td>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td>{recipe.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {recipe.RecipeSteps.map((recipe: any, index: number) => {
                return(
                    <div key={index}>{recipe.step_number}: {recipe.step}</div>
                )})}
            </div>
        </div>
    )
}
