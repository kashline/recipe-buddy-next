import { InputHTMLAttributes } from "react"
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { useDebouncedCallback } from "use-debounce"
import { selectCreateRecipe, CreateRecipeState } from "../lib/features/recipe/createRecipeSlice"
import "./styles/Input.scss"

export default function Input({
    label, 
    setFunction,
    required,
    props
}:{
    label: string, 
    setFunction: Function, 
    required : boolean,
    props?: any
}){
    const dispatch = useAppDispatch()
    const createRecipe = useAppSelector(selectCreateRecipe)
    const friendlyLabel = `${label[0].toUpperCase()}${label.substring(1)}`
    return(
        <div className="flex pb-4">
            <label className="input">{required ? `${friendlyLabel}` : friendlyLabel}</label>
            <input type="text" name={label} className="border-solid border-2 border-grey-light rounded-lg w-10/12" 
                onInput={(e: React.FormEvent<HTMLInputElement>) => {dispatch(setFunction((e.target as HTMLInputElement).value))}} 
                onClick={(e: React.FormEvent<HTMLInputElement>) => {if (createRecipe[label as keyof CreateRecipeState] === ""){dispatch(setFunction(""))}}} 
                value={createRecipe[label as keyof CreateRecipeState]}
                placeholder={friendlyLabel}
                {...props}/>
        </div>
    )
}