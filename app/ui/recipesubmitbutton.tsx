import React from "react"
import { useAppSelector } from "../lib/hooks"
import { selectCreateRecipe } from "../lib/features/recipe/createRecipeSlice"
import Button from "./button"
import Link from "next/link"

export default function RecipeSubmitButton(){
    const [submit, setSubmit] = React.useState('idle')
    const createRecipe = useAppSelector(selectCreateRecipe)
    const  handleSubmit = async () => {
        try{
            const res = await fetch(
                `/api/recipes/new`,
                {
                    body:JSON.stringify(createRecipe),
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status !== 200){
                setSubmit('failed')
            } else {
                setSubmit('success')
            }
        } catch (error){
            console.log(`There was an error sumbitting the recipe: ${error}`)
        }
    }
    switch (submit) {
        case 'idle':
            return(
                <div className=' content-center'>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            )
        case 'failed':
            return(
                <div className=' content-center'>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    <p>Failed to submit recipe!</p>
                </div>
            )
        case 'success':
            return(
                <div style={{ alignContent: 'center'}}>
                    <Button type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <p>Recipe submitted successfully!</p>
                    <div style={{ display: 'flex'}}>
                        <Link href={`/recipes/${createRecipe.name}`}>
                            <Button>Return</Button>
                        </Link>
                    </div>
                </div>
            )
        default:
            break;
    }
}