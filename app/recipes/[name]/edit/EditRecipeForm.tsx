'use client'

import Dropdown from '@/app/ui/dropdown';
import { selectCreateRecipe, fetchRecipe, setImage } from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setLength, setDifficulty, setName, setVideo } from '@/app/lib/features/recipe/createRecipeSlice';
import Input from '@/app/ui/input';
import IngredientsForm from '../../create/IngredientsForm';
import RecipeStepsForm from '../../create/RecipeStepsForms';
import React from 'react';
import RecipeSubmitButton from '@/app/ui/recipesubmitbutton';
import CancelRecipe from '@/app/ui/popups/cancelrecipe';
import DangerZone from '@/app/ui/dangerzone';
import friendifyWords from '@/app/lib/utils/wordfriendifier';



export default function EditRecipeForm({query}: {query: string}){
    const selectRecipe = useAppSelector(selectCreateRecipe)
    const dispatch = useAppDispatch()
    const fetchStatus = useAppSelector((state: any) => state.status)

    React.useEffect(() => {
        if (selectRecipe.status === 'idle'){
            dispatch(fetchRecipe(query))
        }
    }, [fetchStatus, dispatch, query, selectRecipe.status])
    return(
        <div>
            <h1 className='text-center pb-4'><strong style={{ color: 'white' }}>{selectRecipe.name ? friendifyWords(selectRecipe.name) : 'Edit Recipe'}</strong></h1>
            <div>
                <div className='top-div'>
                    <Input setFunction={setName} label='name' required={true}></Input>
                    <Input setFunction={setVideo} label='youtube embed id' required={true}></Input>
                    <Input setFunction={setImage} label='image url' required={true}></Input>
                    <div style={{
                        display: 'flex'
                    }}>
                        <Dropdown 
                            options={['Very Short', 'Short', 'Medium', 'Long', 'Very Long']} 
                            placeholder="Select Length"
                            setFunction={setLength}
                            label='length'
                        />
                        <Dropdown 
                            options={['Very Easy', 'Easy', 'medium', 'Hard', 'Very Hard']} 
                            placeholder="Select Difficulty"
                            setFunction={setDifficulty}
                            label='difficulty'
                        />
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
            <div style={{ display: 'flex'}}>
                <RecipeSubmitButton/>
                <CancelRecipe recipeName={selectRecipe.name}></CancelRecipe>
            </div>
            <div>
                <DangerZone recipeName={selectRecipe.name} recipeID={selectRecipe.id!}/>
            </div>
        </div>
    )
}
