import { Button } from "@mui/base"
import React, { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { setStepField, selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice"

import "./styles.scss"
import Trashcan from "@/app/ui/icons/trashcan"

export default function RecipeStepsForm(){
    const createRecipe = useAppSelector(selectCreateRecipe)
    const dispatch = useAppDispatch()
    return(
        <div className="steps-form">
            <table>
                <thead>
                    <tr >
                        <th scope="col" className="" >
                            Step No.
                        </th>
                        <th scope="col" className="" >
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {createRecipe.steps.map((_, index) => {
                        return(
                            <tr key={index}>
                                <td key={`${index}-step_number`} className="pr-5 w-1">
                                        <p className="rounded-md">{index+1}</p></td>
                                <td key={`${index}-step`} className="pl-5"><textarea className="rounded-md" placeholder="Description" value={createRecipe.steps[index].step} onChange={
                                    (e: ChangeEvent<HTMLTextAreaElement>) => {
                                        dispatch(setStepField({
                                            type: 'setStep', 
                                            index: index, 
                                            value: e.target.value
                                        }))}}></textarea><button></button></td>
                                <td>
                                    <Button key={`${index}-delete`} onClick={() => {dispatch(setStepField({type: 'removeAtIndex', index: index}))}}>
                                        <Trashcan></Trashcan>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button className={''} onClick={() => {dispatch(setStepField({type: 'add'}))}}>Add Step</Button>
        </div>
    )
}
