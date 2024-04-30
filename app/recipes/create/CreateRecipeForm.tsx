import { FormEvent } from "react"
import Dropdown from '@/app/ui/dropdown';
import { selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppSelector } from "@/app/lib/hooks";

export default function CreateRecipeForm(){
    const createRecipe = useAppSelector(selectCreateRecipe)
    const handleChange = (e: any) => {
        console.log('TODO')
      }
    async function handleSubmit(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault()
        console.log('TODO')
        return true
      }
    return(
        <div>
            <h1 className='text-center'><strong>Create recipe</strong></h1>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleChange} className="border-solid border-2 border-grey-light"/>
                </div>
                <div>
                    <label>Difficulty</label>
                    <input type="text" name="email" onChange={handleChange} className="border-solid border-2 border-grey-light"/>
                </div>
                <div>
                    <label>Length</label>
                    <Dropdown options={['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard']}>
                    </Dropdown>
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}