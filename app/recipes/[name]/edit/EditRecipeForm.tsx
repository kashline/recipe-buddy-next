'use client'

import Dropdown from '@/app/ui/dropdown';
import { selectCreateRecipe, fetchRecipe, setImage } from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setLength, setDifficulty, setName, setVideo } from '@/app/lib/features/recipe/createRecipeSlice';
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';
// import './styles.scss'
import IngredientsForm from '../../create/IngredientsForm';
import RecipeStepsForm from '../../create/RecipeStepsForms';
import React from 'react';
import { useSelector } from 'react-redux';
import RecipeSubmitButton from '@/app/ui/recipesubmitbutton';



export default function EditRecipeForm({query}: {query: string}){
    const selectRecipe = useAppSelector(selectCreateRecipe)
    const dispatch = useAppDispatch()
    const fetchStatus = useAppSelector((state: any) => state.status)
    React.useEffect(() => {
        if (selectRecipe.status === 'idle'){
            dispatch(fetchRecipe(query))
        }
    }, [fetchStatus, dispatch])
    return(
        <div>
            <h1 className='text-center pb-4'><strong>Edit recipe</strong></h1>
            <div>
                <div className='top-div'>
                    <Input setFunction={setName} label='name' required={true}></Input>
                    <Input setFunction={setVideo} label='video' required={true}></Input>
                    <Input setFunction={setImage} label='image' required={true}></Input>
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
                    <div className='right-div relative'>
                        <div className='text-center pb-5'>
                            <label><strong>Ingredients</strong></label>
                        </div>
                        <IngredientsForm></IngredientsForm>
                    </div>
                </div>
            </div>
            <RecipeSubmitButton/>
        </div>
    )
}
