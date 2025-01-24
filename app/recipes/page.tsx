"use client";

import useSWR from "swr";
import RecipeGrid from "../ui/RecipeGrid";
import Pagination from "../ui/pagination";
import AnimatedLoading from "../ui/loading/animatedloading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Search from "../ui/search";
import * as React from "react";
import { RecipeZype } from "../lib/data/zodels/Recipe";
import Head from "next/head";

export default function Page() {
  return (
    <Suspense>
      <RedirectWrapper />
    </Suspense>
  );
}

// This is literally just to get past the suspense boundary around useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
function RedirectWrapper() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [url, setUrl] = React.useState("");
  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);
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

  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/recipes/search/fuzzy/?${searchParams.toString()}`,
    fetcher
  );
  if (searchParams.size === 0) {
    return <></>;
  }
  if (error) return <div>ERROR</div>;
  if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
  if (!data) {
    return <>no data</>;
  }
  return (
    <>
      <Head>
        <meta property="og:url" content={`${url}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={``} />
        <meta
          property="og:description"
          content="How much does culture influence creative thinking?"
        />
        <meta
          property="og:image"
          content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
        />
      </Head>
      <h1 className="text-lavendar-blush text-4xl text-center">
        Browse Recipes
      </h1>
      <div className="w-4/5 mx-auto pb-5">
        <Search
          placeholder="Begin typing to search by recipe title, keywords, description, difficulty, etc..."
          param="term"
        />
      </div>
      <RecipeCards
        recipes={data.data.rows}
        recipeCount={Number(data.data.count)}
      />
    </>
  );
}

function RecipeCards({
  recipes,
  recipeCount,
}: {
  recipes: any[];
  recipeCount: number;
}) {
  const searchParams = useSearchParams();
  const recipesPerPage = Number(searchParams.get("recipesPerPage"));
  // const recipes: any = data.data.rows;
  // const recipeCount = Number(data.data.count);
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
