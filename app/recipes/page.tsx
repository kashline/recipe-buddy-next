"use client";

import RecipesTable from "./RecipesTable";
import FilterDropdown from "./FilterDropdown";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    ingredients?: string;
    page?: string;
  };
}) {
  const query = Object.keys(searchParams!)
    .map((key, index) => {
      if (index === 0) {
        return `?${key}=${searchParams![key as keyof typeof searchParams]}`;
      } else {
        return `${key}=${searchParams![key as keyof typeof searchParams]}`;
      }
    })
    .join("&");
  return (
    <div>
      <FilterDropdown></FilterDropdown>
      <Suspense fallback={<CircularProgress/>}>
        <RecipesTable query={query} />
      </Suspense>
    </div>
  );
}
