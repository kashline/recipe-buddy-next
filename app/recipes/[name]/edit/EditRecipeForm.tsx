'use client'

import { selectCreateRecipe, fetchRecipe } from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import React from 'react';
import CreateRecipeForm from '../../create/CreateRecipeForm';

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
        <CreateRecipeForm></CreateRecipeForm>
    )
}
