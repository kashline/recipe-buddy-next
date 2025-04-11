"use client";

import RatingIcon from "@/app/ui/icons/ratingicon";
import * as React from "react";
import "./styles/reciperatings.css";
import { signIn } from "@/auth";
import Link from "next/link";
import useResponsiveBreakpoints from "@/app/lib/utils/useResponsiveBreakpoints";
import useSWR from "swr";
import { useRouter } from "next/navigation";

export default function RecipeRatingButton({
  userEmail,
  recipeId,
}: {
  userEmail: string;
  recipeId: number;
}) {
  const [rating, setRating] = React.useState();
  const [isMobile, isPortrait] = useResponsiveBreakpoints();
  const size = isMobile ? 25 : 50;
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `/api/recipes/ratings/${recipeId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 30000,
    }
  );
  React.useEffect(() => {
    setRating(data ? data.data.rating : null);
  }, [data]);
  if (!userEmail)
    return (
      <button
        onClick={() => signIn()}
        className="text-lavendar-blush hover:text-non-photo-blue"
      >
        Please log in to edit and favorite recipies!
      </button>
    );
  if (isLoading)
    return (
      <div  className={`w-full text-center h-[55]`}>
        <h1>Loading...</h1>
      </div>
    );
  if (error) return <Link href={`/auth/login`}>Error! Please try again</Link>;

  return (
    <div className={`text-center h-[${size}]`}>
      <p className="text-lavendar-blush">Your rating</p>
      <div className="flex justify-center">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index}>
              {" "}
              <button
                onClick={async () => {
                  const response = await (
                    await fetch("/api/recipes/ratings", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        userEmail: userEmail,
                        recipeId: recipeId,
                        rating: index + 1,
                      }),
                    })
                  ).json();
                  setRating(response.recipeRating[0].rating);
                  router.refresh();
                  return response;
                }}
              >
                <RatingIcon
                  style={{
                    height: `${"25px"}`,
                    width: `${"25px"}`,
                    fill: `${rating! > index ? "yellow" : "none"}`,
                  }}
                  className={`ratingicon-${index + 1} `}
                  id={`ratingicon-${index + 1}`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
