import { Button } from "@mui/base"
import React, { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { setIngredientField, selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice"
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import "./styles.scss"
import Trashcan from "@/app/ui/icons/trashcan"
import { Option } from "react-bootstrap-typeahead/types/types"
// import "bootstrap/dist/css/bootstrap.min.css"

export default function IngredientsForm(){
    const createRecipe = useAppSelector(selectCreateRecipe)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = React.useState(false);
    const [ingredients, setIngredients] = React.useState<String[]>([])
    const typaheadRef = React.useRef(null)

    const handleChange = (query: Option[], index: number) => {
        dispatch(setIngredientField({
            type: 'setName', 
            index: index, 
            value: String(query[0])
        }))
    }
    const handleSearch = (query: string, index: number) => {
        dispatch(setIngredientField({
            type: 'setName', 
            index: index, 
            value: query
        }))
        setIsLoading(true)
        fetch(`/api/recipes/ingredients?name=${query}`)
        .then((res) => res.json())
        .then((data) => {
            setIngredients(data)
            setIsLoading(false)
        })
    }
    return(
        <div>
            <table style={{}}>
                <thead>
                    <tr >
                        <th scope="col" style={{ width: '50%' }}>
                            Ingredient Name
                        </th>
                        <th scope="col" style={{ width: '50%', textAlign: 'right' }}>
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {createRecipe.Ingredients.map((ingredient, index) => {
                        return(
                            <tr key={index} style={{}}>
                                <td key={`${index}-name`} style={{background: "white",}}>
                                    <AsyncTypeahead 
                                        placeholder={
                                            ingredient.name === 'undefined' || 
                                            ingredient.name.length === 0
                                            ?  "Ingredient..." : ingredient.name}
                                        options={ingredients!}
                                        isLoading={isLoading}
                                        ref={typaheadRef}
                                        defaultSelected={[createRecipe.Ingredients[index].name]}
                                        onChange={query => handleChange(query, index)}
                                        onSearch={query => handleSearch(query, index)}
                                        emptyLabel={`${createRecipe.Ingredients[index].name}`}
                                        renderMenuItemChildren={(option: any) => (
                                            <p style={{ color: 'black' }}>
                                                {option}
                                            </p>
                                        )}
                                    />
                                </td>
                                <td 
                                key={`${index}-quantity`} 
                                className=" pl-2">
                                    <input 
                                    className="text-right rounded-md w-full" 
                                    value={createRecipe.Ingredients[index].RecipeIngredient.quantity} 
                                    placeholder="Quantity" 
                                    onChange={
                                        (e: ChangeEvent<HTMLInputElement>) => {
                                            dispatch(setIngredientField({
                                                type: 'setQuantity', 
                                                index: index, 
                                                value: (e.target as HTMLInputElement).value
                                    }))}}/>
                                    </td>
                                <td>
                                    <Button 
                                        key={`${index}-delete`} 
                                        style={{ boxShadow: 'none' }}
                                        onClick={() => {dispatch(setIngredientField({type: 'removeAtIndex', index: index}))}}>
                                            <Trashcan></Trashcan>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button style={{marginTop: 22, boxShadow: 'none' }} onClick={() => {dispatch(setIngredientField({type: 'add'}))}}>Add Ingredient</Button>
        </div>
    )
}
