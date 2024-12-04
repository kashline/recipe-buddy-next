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
      <h1 className="text-lavendar-blush text-4xl text-center">
        Browse Recipes
      </h1>
      <FilterDropdown />
      <RecipeCards />
    </Suspense>
  );
}

function RecipeCards() {
  const searchParams = useSearchParams();
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    // Hard coded page number :()
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
  if (recipeCount === 0) {
    return (
      <div className="flex-col h-screen w-full">
        <p className="text-lavendar-blush justify-center text-center mx-auto mt-[50%]">
          We couldn&apos;t find any recipes matching your current filters
        </p>
        <p className="text-lavendar-blush justify-center text-center mx-auto mt-[50%]">
          Change your filters or{" "}
          <a className="text-lavendar-blush" href="/recipes/create">
            create a new recipe
          </a>
        </p>
      </div>
    );
  }
  return (
    <div>
      <RecipeGrid data={recipes} />
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "fit-content",
        }}
      >
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
