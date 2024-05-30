import { Button } from "@mui/base"
import React, { ChangeEvent, ChangeEventHandler } from "react"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { setIngredientField, selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice"
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import "./styles.scss"
import Trashcan from "@/app/ui/icons/trashcan"

export default function IngredientsForm(){
    const createRecipe = useAppSelector(selectCreateRecipe)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = React.useState(false);
    const [ingredients, setIngredients] = React.useState<String[]>([]);

    const handleSearch = (query: string, index?: number) => {
        dispatch(setIngredientField({
            type: 'setName', 
            index: index, 
            value: query
        }))
        setIsLoading(true)
        fetch(`/api/recipes/ingredients?name=${query}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setIngredients(data)
            setIsLoading(false)
        })
    }
    return(
        <div className="">
            <table style={{}}>
                <thead>
                    <tr >
                        <th scope="col" className="w-1/2" >
                            Ingredient
                        </th>
                        <th scope="col" className="w-1/2">
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {createRecipe.ingredients.map((_, index) => {
                        return(
                            <tr key={index}>
                                <td key={`${index}-name`} style={{background: "white"}}>
                                        <AsyncTypeahead 
                                            style={{
                                                borderRadius: "6px", 
                                                width: '100%', 
                                                background: 'white',
                                            }}
                                            placeholder="Ingredient..."
                                            options={ingredients!}
                                            isLoading={isLoading}
                                            onSearch={query => handleSearch(query, index)}
                                            emptyLabel={`New Ingredient..${createRecipe.ingredients[index].name}`}
                                            renderMenuItemChildren={(option: any) => (
                                                    <p style={{background: "white"}}>
                                                        {option}
                                                    </p>
                                            )}
                                        >
                                    </AsyncTypeahead>
                                </td>
                                <td 
                                key={`${index}-quantity`} 
                                className=" pl-2">
                                    <input 
                                    className="text-right rounded-md w-full" 
                                    value={createRecipe.ingredients[index].quantity} 
                                    placeholder="Quantity" 
                                    onChange={
                                        (e: ChangeEvent<HTMLInputElement>) => {
                                            dispatch(setIngredientField({
                                                type: 'setQuantity', 
                                                index: index, 
                                                value: (e.target as HTMLInputElement).value
                                    }))}}/>
                                        <button></button>
                                    </td>
                                <td>
                                    <Button 
                                        key={`${index}-delete`} 
                                        className="" 
                                        onClick={() => {dispatch(setIngredientField({type: 'removeAtIndex', index: index}))}}>
                                            <Trashcan></Trashcan>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button style={{marginTop: 22, border: "solid"}} onClick={() => {dispatch(setIngredientField({type: 'add'}))}}>Add Ingredient</Button>
        </div>
    )
}
