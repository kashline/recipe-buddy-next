import { selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppSelector } from "@/app/lib/hooks";

export default function validateRecipe(){
    useAppSelector(selectCreateRecipe)
}
