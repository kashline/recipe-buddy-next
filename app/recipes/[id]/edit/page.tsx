"use client";

import { StoreProvider } from "@/app/StoreProvider";
import EditRecipeForm from "./EditRecipeForm";
import { useUser } from "@auth0/nextjs-auth0";
import * as React from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // console.log(React.use(params).id)
  const id = React.use(params).id
  const {user, isLoading, error} = useUser()
  if (isLoading){
    return <>Loading</>
  }
  if (!user){
    return <h1>You must login to view this page</h1>
  }
  if (error){
    return <>{`There was an error: ${error}`}</>
  }
  return (
    <StoreProvider>
      <h1 className="flex w-full justify-center text-lavendar-blush text-4xl pb-2">
        Edit Recipe
      </h1>
      <EditRecipeForm query={`${id}`} />
    </StoreProvider>
  );
}
