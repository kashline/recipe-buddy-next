'use client'

import {StoreProvider} from '@/app/StoreProvider';
import CreateRecipeForm from './CreateRecipeForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

 
export default withPageAuthRequired(function Page() {
   return (
    <StoreProvider>
        <CreateRecipeForm/>
    </StoreProvider>
  )
})
