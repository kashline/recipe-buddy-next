"use client";

import useSWR from "swr";
import RecipeGrid from "@/app/ui/RecipeGrid";
import FilterDropdown from "@/app/recipes/FilterDropdown";
import Pagination from "@/app/ui/pagination";
import AnimatedLoading from "@/app/ui/loading/animatedloading";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  return (
    // Need suspense boundary around useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    <Suspense>
      <RecipeCards/>
    </Suspense>
  );
}

function RecipeCards(){
  const searchParams = useSearchParams();
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/recipes?${searchParams.toString()}&recipesPerPage=12&favorited=true`, fetcher);
  if (error) return <div>ERROR</div>;
  if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
  if (!data) {
    return <>no data</>;
  }
  const recipes: any = data[0][1];
  const recipeCount = Number(data[1][1]);
  const totalPages =
    Math.ceil(recipeCount / 12) === 0
      ? 1
      : Math.ceil(recipeCount / 12);
  if (recipes.length === 0){
    return(
      <div>
        <h1>You haven&apost favorited any recipes yet!</h1>
        <p>You can browse recipes and favorite them or create a new recipe then favorite it.</p>
      </div>
    )
  }
  return (
    <Suspense>
      <FilterDropdown></FilterDropdown>
      <RecipeGrid data={recipes}></RecipeGrid>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 'fit-content' }}>
        <Pagination totalPages={totalPages} />
      </div>
    </Suspense>
  );
}
