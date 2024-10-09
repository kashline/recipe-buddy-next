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
    // Need suspense boundary around useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    <Suspense>
      <RecipeCards />
    </Suspense>
  );
}

function RecipeCards() {
  const searchParams = useSearchParams();
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/recipes?${searchParams.toString()}&recipesPerPage=12`,
    fetcher,
  );
  if (error) return <div>ERROR</div>;
  if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
  if (!data) {
    return <>no data</>;
  }
  const recipes: any = data[0][1];
  const recipeCount = Number(data[1][1]);
  const totalPages =
    Math.ceil(recipeCount / 12) === 0 ? 1 : Math.ceil(recipeCount / 12);
  return (
    <Suspense>
      <FilterDropdown></FilterDropdown>
      <RecipeGrid data={recipes}></RecipeGrid>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "fit-content",
        }}
      >
        <Pagination totalPages={totalPages} />
      </div>
    </Suspense>
  );
}
