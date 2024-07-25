import Image from "next/image";
import { unstable_noStore as noStore } from 'next/cache';
import './styles.css'
import Video from "@/app/ui/video";
import friendifyWords from "@/app/lib/utils/wordfriendifier";
import Link from "next/link";
import RecipeOptions from "./recipeoptions";

export default async function Page({params}: {params: {name: string}}){
    noStore()
    const recipeData: Map<string, Object[]> = new Map(await (await fetch(`${process.env.APP_URL}/api/recipes?name=${params.name}`)).json())
    const recipe: any = recipeData.get('recipes')![0]
    const friendlyName = friendifyWords(recipe.name)
    console.log(params.name)
    return(
        <div style={{ color: 'white' }}>
            <h1 style={{ 
                textAlign: 'center',
                fontSize: '2.25rem',
                lineHeight: '2.5rem',
                paddingBottom: '1rem',
            }}><strong style={{ color: 'white' }}>{friendlyName}</strong></h1>
            <div className="inline-flex">
                <div className="steps-box">
                    <div className="">
                        <Video embedId={recipe.video}></Video>
                        <div className="pt-5">
                            <p className="text-center pb-4"><strong className="">Steps</strong></p>
                            {recipe.RecipeSteps.map((recipe: any, index: number) => {
                            return(
                                <p className="pb-5" key={index}><strong style={{ color: 'white' }}>{recipe.step_number}</strong>: {recipe.step}</p>
                            )})}
                            </div>
                    </div>
                </div>
                <div className="info-box">
                    <RecipeOptions></RecipeOptions>
                    <Image
                        src={recipe.image || '/chef-icon.png'}
                        className="mr-2"
                        width={260}
                        height={260}
                        alt={`Delicious ${friendlyName}`}
                        />
                    <table className="w-64 px-10">
                        <tbody>
                            <tr className="border-solid border-2 border-black">
                                <td className="text-center " colSpan={100}><strong style={{ color: 'white' }}>Quick Info</strong></td>
                            </tr>
                            <tr className="border-solid border-2 border-black">
                                <td className="border-solid border-2 border-black">Difficulty</td>
                                <td className="text-right">{recipe.difficulty}</td>
                            </tr>
                            <tr className="border-solid border-2 border-black">
                                <td className="border-solid border-2 border-black">Length</td>
                                <td className="text-right">{recipe.length}</td>
                            </tr>
                            <tr className="border-solid border-2 border-black">
                                <td className="text-center" colSpan={100}><strong style={{ color: 'white' }}>Ingredients</strong></td>
                            </tr>
                            {recipe.Ingredients.map((ingredient: any, index: any) => {
                                return(
                                    <tr key={index} className="border-solid border-2 border-black">
                                        <td className="border-solid border-2 border-black" key={index}>{ingredient.name}</td>
                                        <td key={`${index}-${ingredient.RecipeIngredient.quantity}`} className="text-right">{ingredient.RecipeIngredient.quantity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    
                </div>
                
            </div>
        </div>
    )
}
