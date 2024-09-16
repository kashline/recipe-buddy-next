"use client";

import useSWR from "swr";
import RecipeGrid from "../ui/RecipeGrid";
import FilterDropdown from "../recipes/FilterDropdown";
import Pagination from "../ui/pagination";
import AnimatedLoading from "../ui/loading/animatedloading";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <RecipeCard/>
    </Suspense>
  );
}

function RecipeCard(){
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/recipes?page=${page}&recipesPerPage=12`, fetcher);
  if (error) return <div>ERROR</div>;
  if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
  if (!data) {
    return <>no data</>;
  }
  const recipes: any = data[0][1];
  const recipeCount = Number(data[1][1]);
  const totalPages =
    Math.round(recipeCount / 12) === 0
      ? 1
      : Math.round(recipeCount / 12);
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
