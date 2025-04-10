"use server";

import RecipeRating from "@/app/data/models/RecipeRating";
import { auth } from "@/auth";
import dynamic from "next/dynamic";

const DynamicSearchWithCards = dynamic(() => import("../ui/searchWithCards"), {
  loading: () => <p>Loading...</p>,
});

export default async function Page() {
  await RecipeRating.sync()
  const session = await auth()
  return (
    <>
      <DynamicSearchWithCards session={session} title="Browse Recipes" favorited={false} />
    </>
  );
}