import { Button } from "@mui/base"
import React, { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks"
import { setStepField, selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice"

import "./styles.scss"

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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
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
