"use client";

import { StoreProvider } from "@/app/StoreProvider";
import EditRecipeForm from "./EditRecipeForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Page({ params }: { params: any }) {
  return (
    <StoreProvider>
      <h1 className="flex w-full justify-center text-lavendar-blush text-4xl pb-2">
        Edit Recipe
      </h1>
      <EditRecipeForm query={`${params!.id}`} />
    </StoreProvider>
  );
})
