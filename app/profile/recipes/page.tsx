"use client";

import { Suspense } from "react";
import SearchWithCards from "@/app/ui/searchWithCards";
import { useUser } from "@auth0/nextjs-auth0";

export default function Page() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="text-lavendar-blush mx-auto">Logging you in...</div>;
  if (!user) {
    return (
      <div className="text-lavendar-blush">
        You must be logged in to view this page
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    // Need suspense boundary around useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    <Suspense>
      <SearchWithCards title="My Recipes" favorited={true} />
    </Suspense>
  );
}
