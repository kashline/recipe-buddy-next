"use client";

import dynamic from "next/dynamic";

const DynamicSearchWithCards = dynamic(() => import("../ui/searchWithCards"), {
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  return (
    <>
      <DynamicSearchWithCards title="Browse Recipes" favorited={false} />
    </>
  );
}