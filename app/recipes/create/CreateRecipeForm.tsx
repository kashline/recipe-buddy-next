import Dropdown from '@/app/ui/dropdown';
import { selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppSelector } from "@/app/lib/hooks";
import { setLength, setDifficulty, setName, setVideo } from '@/app/lib/features/recipe/createRecipeSlice';
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';
import './styles.scss'
import IngredientsForm from './IngredientsForm';
import RecipeStepsForm from './RecipeStepsForms';
import React from 'react';
import RecipeSubmitButton from '@/app/ui/recipesubmitbutton';
import CancelRecipe from '@/app/ui/popups/cancelrecipe';

export default function CreateRecipeForm(){
    return(
        <div>
            <h1 className='text-center pb-4'><strong>Create recipe</strong></h1>
            <div>
                <div className='top-div'>
                    <Input setFunction={setName} label='name' required={true}></Input>
                    <Input setFunction={setVideo} label='video' required={true}></Input>
                    <div className=''>
                        <Dropdown 
                            options={['Very Short', 'Short', 'Medium', 'Long', 'Very Long']} 
                            placeholder="Select Length"
                            setFunction={setLength}
                            label='length'
                            >
                        </Dropdown>
                        <Dropdown 
                            options={['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard']} 
                            placeholder="Select Difficulty"
                            setFunction={setDifficulty}
                            label='difficulty'
                        >
                        </Dropdown>
                    </div>
                </div>
                <div className='form-div'>
                    <div className='left-div'>
                        <div className='text-center'>
                            <label><strong>Steps</strong></label>
                        </div>
                        <RecipeStepsForm></RecipeStepsForm>
                    </div>
                    <div className='right-div'>
                        <div className='text-center pb-5'>
                            <label><strong>Ingredients</strong></label>
                        </div>
                        <IngredientsForm></IngredientsForm>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <RecipeSubmitButton></RecipeSubmitButton>
                <CancelRecipe></CancelRecipe>
            </div>
        </div>
    )
}
