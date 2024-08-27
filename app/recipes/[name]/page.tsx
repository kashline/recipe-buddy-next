import Image from "next/image";
import './styles.css'
import friendifyWords from "@/app/lib/utils/wordfriendifier";
import RecipeOptions from "./recipeoptions";
import Link from "next/link";

export default async function Page({params}: {params: {name: string}}){
    const recipeData: Map<string, Object[]> = new Map(await (await fetch(`${process.env.APP_URL}/api/recipes?name=${params.name}`)).json())
    const recipe: any = recipeData.get('recipes')![0]
    const friendlyName = friendifyWords(recipe.name)
    return(
        <div style={{ color: 'white' }}>
            <h1 style={{ 
                textAlign: 'center',
                fontSize: '2.25rem',
                lineHeight: '2.5rem',
                paddingBottom: '1rem',
            }}><strong style={{ color: 'white' }}>{friendlyName}</strong></h1>
            <div style={{
                display: 'inline-flex'
            }}>
                <div style={{
                    marginRight: 20,
                    width: '75%',
                    paddingRight: 15
                }}>
                    <div>
                        <div style={{
                            paddingTop: 20
                        }}>
                            <p style={{ textAlign: 'center', paddingBottom: 4 }}><strong style={{ color: 'white', }}>Recipe Steps</strong></p>
                                {recipe.RecipeSteps.map((recipe: any, index: number) => {
                                return(
                                    <p style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'gray', paddingLeft: 15, paddingRight: 15 }} key={index}><strong style={{ color: 'white' }}>{recipe.step_number}</strong>: {recipe.step}</p>
                                )})}
                            </div>
                    </div>
                </div>
                <div style={{
                    width: '25%',
                    blockSize: 'fit-content',
                    position: 'relative',
                    alignContent: 'right',
                    alignItems: 'right',
                }}>
                    <RecipeOptions recipeId={Number(recipe.id)}></RecipeOptions>
                    <div style={{
                        position: 'relative',
                        width: "100%",
                        height: 250,
                        paddingRight: 100
                    }}>
                        <Image
                            src={recipe.image || '/chef-icon.png'}
                            style={{
                            }}
                            alt={`Delicious ${friendlyName}`}
                            fill={true}
                            />
                    </div>
                    <table style={{
                        width: '100%',
                    }}>
                        <tbody>
                            <tr style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>
                                <td style={{ textAlign: 'center' }} colSpan={100}><strong style={{ color: 'white' }}>Quick Info</strong></td>
                            </tr>
                            <tr style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>
                                <td style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>Difficulty</td>
                                <td style={{ textAlign: 'right' }} >{recipe.difficulty}</td>
                            </tr>
                            <tr style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>
                                <td style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>Length</td>
                                <td style={{ textAlign: 'right' }}>{recipe.length}</td>
                            </tr>
                            <tr style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>
                                <td style={{ textAlign: 'center' }} colSpan={100}><Link href={recipe.video} style={{ color: 'white' }}>Instructional Video Link</Link></td>
                            </tr>
                            <tr style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>
                                <td style={{ textAlign: 'center' }} colSpan={100}><strong style={{ color: 'white' }}>Ingredients</strong></td>
                            </tr>
                            {recipe.Ingredients.map((ingredient: any, index: any) => {
                                return(
                                    <tr key={index} style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}>
                                        <td style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }} key={index}>{ingredient.name}</td>
                                        <td key={`${index}-${ingredient.RecipeIngredient.quantity}`} style={{ textAlign: 'right' }}>{ingredient.RecipeIngredient.quantity}</td>
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
