'use client'

import {StoreProvider} from '@/app/StoreProvider';
import CreateRecipeForm from './CreateRecipeForm';
 
export default function Page() {
   return (
    <StoreProvider>
        <CreateRecipeForm/>
    </StoreProvider>
  )
}
