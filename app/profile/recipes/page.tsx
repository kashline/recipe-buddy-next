"use server";

import { Suspense } from "react";
import SearchWithCards from "@/app/ui/searchWithCards";
import { auth } from "@/auth";

/**
 * User's favorites recipe page
 * @returns Promise<JSX.Element>
 */
export default async function Page() {
  const session = await auth();
  if (!session) {
    return (
      <div className="text-lavendar-blush">
        You must be logged in to view this page
      </div>
    );
  }
  return (
    // Need suspense boundary around useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    <div>
      <Suspense>
        <SearchWithCards session={session} title="Favorites" favorited={true} />
      </Suspense>
    </div>
  );
}
