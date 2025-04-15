"use server";

import CreateRecipeForm from "./CreateRecipeForm";
import { auth } from "@/auth";

/**
 * Initial landing page for create recipe.  Validates session.
 * @returns Promise<React.JSX.Element>
 */
export default async function Page() {
  const session = await auth();
  if (!session) {
    return (
      <h1 className="text-lavendar-blush">
        You must be logged in to view this page.
      </h1>
    );
  }
  return (
    <div className="justify-center">
      <h1 className="flex w-full justify-center text-lavendar-blush text-4xl pb-2">
        Create Recipe
      </h1>
      <CreateRecipeForm session={session} />
    </div>
  );
}
