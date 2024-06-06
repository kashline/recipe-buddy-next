'use server'

import {StoreProvider} from '@/app/StoreProvider';
import CreateRecipeForm from '../../create/CreateRecipeForm';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import EditRecipeForm from './EditRecipeForm';
import { useAppSelector } from '@/app/lib/hooks';
import { selectCreateRecipe } from '@/app/lib/features/recipe/createRecipeSlice';

export default withPageAuthRequired(async function Page({
    params,
    searchParams
}) {
    const user = await getSession()
    const recipeData: Map<string, Object[]> = new Map(await (await fetch(`${process.env.APP_URL}/api/recipes?name=${params!.name}`)).json())
    const recipe: any = recipeData.get('recipes')![0]
    // const createRecipe = useAppSelector(selectCreateRecipe)
    // const dispatch = useAppDispatch()
    // dispatch(initAll(recipe))
    
    return (
        <StoreProvider>
            <EditRecipeForm query={`${params!.name}`}/>
        </StoreProvider>
    )
})