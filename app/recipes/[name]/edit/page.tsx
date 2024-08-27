"use server";

import { StoreProvider } from "@/app/StoreProvider";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import EditRecipeForm from "./EditRecipeForm";

export default withPageAuthRequired(async function Page({ params }) {
  // const user = await getSession()
  // console.log(user)
  // const recipeData: Map<string, Object[]> = new Map(await (await fetch(`${process.env.APP_URL}/api/recipes?name=${params!.name}`)).json())
  // const recipe: any = recipeData.get('recipes')![0]
  return (
    <StoreProvider>
      <EditRecipeForm query={`${params!.name}`} />
    </StoreProvider>
  );
});
