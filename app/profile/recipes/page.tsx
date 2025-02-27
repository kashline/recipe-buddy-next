"use client";

import useSWR from "swr";
import RecipeGrid from "@/app/ui/RecipeGrid";
import Pagination from "@/app/ui/pagination";
import AnimatedLoading from "@/app/ui/loading/animatedloading";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Search from "@/app/ui/search";
import { favoriteSVG } from "@/app/ui/FavoriteButton";
import SearchWithCards from "@/app/ui/searchWithCards";

export default function Page() {
  return (
    // Need suspense boundary around useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    <Suspense>
      <SearchWithCards title="My Recipes" favorited={true}/>
    </Suspense>
  );
}

// function RecipeCards() {
//   const searchParams = useSearchParams();
//   const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
//   const { data, error, isLoading } = useSWR(
//     `/api/recipes?${searchParams.toString()}&recipesPerPage=12&favorited=true`,
//     fetcher
//   );
//   if (error) return <div>ERROR</div>;
//   if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
//   if (!data) {
//     return <>no data</>;
//   }
//   const recipes: any = data[0][1];
//   const recipeCount = Number(data[1][1]);
//   const totalPages =
//     Math.ceil(recipeCount / 12) === 0 ? 1 : Math.ceil(recipeCount / 12);
//   if (recipes.length === 0) {
//     return (
//       <div>
//         <p className="text-lavendar-blush mx-auto my-auto justify-center text-center">{`You haven't favorited any recipes yet!`}</p>
//         <p className="text-lavendar-blush mx-auto my-auto justify-center text-center">
//           {`You can add recipes to your favorites by clicking the favorite icon under each recipe.`}
//         </p>
//       </div>
//     );
//   }
//   return (
//     <Suspense>
//       <div className="w-4/5 mx-auto pb-5">
//         <Search
//           placeholder="Begin typing to search by recipe title, keywords, description, difficulty, etc..."
//           param="term"
//         ></Search>
//       </div>
//       <RecipeGrid data={recipes} />
//       <div
//         style={{
//           marginLeft: "auto",
//           marginRight: "auto",
//           maxWidth: "fit-content",
//         }}
//       >
//         <Pagination totalPages={totalPages} />
//       </div>
//     </Suspense>
//   );
// }
