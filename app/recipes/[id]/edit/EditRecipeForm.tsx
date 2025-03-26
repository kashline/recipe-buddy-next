"use client";

import {
  selectCreateRecipe,
  fetchRecipe,
} from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import React from "react";
import CreateRecipeForm from "../../create/CreateRecipeForm";
import AnimatedLoading from "@/app/ui/loading/animatedloading";
import { useUser } from "@auth0/nextjs-auth0";
import Button from "@/app/ui/button";
import Link from "next/link";

export default function EditRecipeForm({ query }: { query: string }) {
  const selectRecipe = useAppSelector(selectCreateRecipe);
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector((state: any) => state.status);
  const { user } = useUser();
  React.useEffect(() => {
    if (selectRecipe.status === "idle") {
      dispatch(fetchRecipe(query));
    }
  }, [fetchStatus, dispatch, query, selectRecipe.status]);
  if (selectRecipe.status === "idle")
    return <AnimatedLoading name="Recipes"></AnimatedLoading>;
  if (selectRecipe.status === "succeeded")
    if (user?.sub !== selectRecipe.owner) {
      return (
        <div className="w-full flex-col flex h-40">
          <h1 className="text-lavendar-blush text-4xl mx-auto my-auto">
            You can&apos;t edit recipes you don&apos;t own!
          </h1>
          <Link href="/recipes" className="mx-auto"><Button>Back</Button></Link>
        </div>
      );
    }
  return (
    <>
      <CreateRecipeForm/>
    </>
  );
}
