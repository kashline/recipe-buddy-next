"use server";

import CreateRecipeForm from "./CreateRecipeForm";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth()
  return (
    <div className="justify-center">
      <h1 className="flex w-full justify-center text-lavendar-blush text-4xl pb-2">
        Create Recipe
      </h1>
      <CreateRecipeForm session={session}/>
    </div>
  );
};
