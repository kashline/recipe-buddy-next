"use server";

import { Suspense } from "react";
import SearchWithCards from "@/app/ui/searchWithCards";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth()
  // if (isLoading) return <div className="text-lavendar-blush mx-auto">Logging you in...</div>;
  if (!session) {
    return (
      <div className="text-lavendar-blush">
        You must be logged in to view this page
      </div>
    );
  }
  return (
    // Need suspense boundary around useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    <Suspense>
      <SearchWithCards session={session} title="My Recipes" favorited={true} />
    </Suspense>
  );
}
