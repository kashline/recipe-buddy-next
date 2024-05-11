import { useAppDispatch, useAppSelector } from "../../hooks"
import { selectCreateRecipe, setNameValid } from "./createRecipeSlice"

const createRecipe = useAppSelector(selectCreateRecipe)
const dispatch = useAppDispatch()

export const validateName = () => {
    dispatch(setNameValid(false))
}