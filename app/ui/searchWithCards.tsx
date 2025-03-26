import Pagination from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import AnimatedLoading from "./loading/animatedloading";
import RecipeGrid from "./RecipeGrid";
import Search from "./search";
import * as React from "react";
import Link from "next/link";

export default function SearchWithCards({
  title,
  favorited,
}: {
  title: string;
  favorited: boolean;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <>
      <h1 className="text-lavendar-blush text-4xl text-center">{title}</h1>
      <div className="w-4/5 mx-auto pb-5">
        <Search
          placeholder="Begin typing to search by recipe title, keywords, description, difficulty, etc..."
          state={searchTerm}
          setState={setSearchTerm}
        />
      </div>
      <RecipeCards searchTerm={searchTerm} favorited={favorited} />
    </>
  );
}

function RecipeCards({
  searchTerm,
  favorited,
}: {
  searchTerm: string;
  favorited: boolean;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      
      return params.toString();
    },
    [searchParams]
  );
  React.useEffect(() => {
    if (searchParams.get('recipesPerPage') === null && searchParams.get('page') === null) {
      router.push(
        `${pathName}?${createQueryString("page", "1")}&${createQueryString("recipesPerPage", "12")}`
      );
    } else {
      if (searchParams.get('recipesPerPage') === null){
        router.push(
          `${pathName}?${createQueryString("recipesPerPage", "12")}`
        );
      }
      if (searchParams.get('page') === null){
        router.push(
          `${pathName}?${createQueryString("page", "1")}`
        );
      }
    }


  }, [searchParams, createQueryString, pathName, router]);
  const recipesPerPage = Number(searchParams.get("recipesPerPage"));
  const page = Number(searchParams.get('page') || 1)
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const stem =
    searchTerm === ""
      ? `/api/recipes/search/fuzzy/?page=${page}&recipesPerPage=${recipesPerPage}&favorited=${favorited}`
      : `/api/recipes/search/fuzzy/?page=${page}&recipesPerPage=${recipesPerPage}&term=${searchTerm}&favorited=${favorited}`;
  const { data, error, isLoading } = useSWR(stem, fetcher);
  if (searchParams.size === 0) {
    return <></>;
  }
  if (error) return <div>ERROR</div>;
  if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
  if (!data) {
    return <>no data</>;
  }
  const recipes: any = data.recipes;
  const recipeCount = Number(data.count);
  const totalPages =
    Math.ceil(recipeCount / recipesPerPage) === 0
      ? 1
      : Math.ceil(recipeCount / recipesPerPage);
  if (recipeCount === 0) {
    return (
      <div className="flex-col h-screen w-full">
        <p className="text-lavendar-blush justify-center text-center mx-auto mt-[50%]">
          We couldn&apos;t find any recipes matching your current filters
        </p>
        <p className="text-lavendar-blush justify-center text-center mx-auto mt-[50%]">
          Change your filters or{" "}
          <Link className="text-lavendar-blush" href="/recipes/create">
            create a new recipe
          </Link>
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
