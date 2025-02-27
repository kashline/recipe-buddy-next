import Pagination from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import AnimatedLoading from "./loading/animatedloading";
import RecipeGrid from "./RecipeGrid";
import Search from "./search";
import * as React from "react";

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
    if (searchParams.size === 0) {
      router.push(
        `${pathName}?${createQueryString("page", "1")}&${createQueryString("recipesPerPage", "12")}`
      );
    }
  }, [searchParams, createQueryString, pathName, router]);
  // const searchParams = useSearchParams();
  const recipesPerPage = Number(searchParams.get("recipesPerPage"));
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const stem =
    searchTerm === ""
      ? `/api/recipes/search/fuzzy/?${searchParams.toString()}&favorited=${favorited}`
      : `/api/recipes/search/fuzzy/?${searchParams.toString()}&term=${searchTerm}&favorited=${favorited}`;
  const { data, error, isLoading } = useSWR(stem, fetcher);
  if (searchParams.size === 0) {
    return <></>;
  }
  if (error) return <div>ERROR</div>;
  if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
  if (!data) {
    return <>no data</>;
  }
  const recipes: any = data.data.rows;
  const recipeCount = Number(data.data.count);
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
