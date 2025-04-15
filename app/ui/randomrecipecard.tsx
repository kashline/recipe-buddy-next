import useSWR from "swr";
import AnimatedLoading from "./loading/animatedloading";
import RecipeCard from "./RecipeCard";
import * as React from "react";

export default function RandomRecipeCard() {
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/recipes/random`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  });
  if (error) return <div>ERROR</div>;
  if (isLoading)
    return (
      <div>
        <AnimatedLoading name={"Recipe"}></AnimatedLoading>
      </div>
    );
  if (!data) {
    return <>no data</>;
  }
  return (
    <div className="bg-gunmetal">
      <div className="flex">
        <h1 className="text-lavendar-blush text-2xl">Random recipe!</h1>
      </div>
      {/* <RecipeCard data={data.data[0]} /> */}
    </div>
  );
}
