"use client";

import Link from "next/link";
import { useState } from "react";
import notificationOnClick from "./notificationOnClick";
import useResponsiveBreakpoints from "../lib/utils/useResponsiveBreakpoints";
import useSWR from "swr";
import React from "react";
import { Session } from "next-auth";
import FavoriteIcon from "@/app/ui/icons/favoriteicon";
import { signIn } from "next-auth/react";

export default function FavoriteButton({
  recipeId,
  recipeName,
  session,
  size,
}: {
  recipeId: number;
  recipeName: string;
  session: Session | null;
  size?: string;
}) {
  const user = session?.user;
  const [favorite, setFavorite] = useState(false);
  const [isMobile, isPortrait] = useResponsiveBreakpoints();
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/favorite/get?RecipeId=${recipeId}`,
    user ? fetcher : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 30000,
    }
  );
  React.useEffect(() => {
    setFavorite(data ? data.success : false);
  }, [data]);
  if (!user)
    return (
      <button
        onClick={() => signIn()}
        className="text-lavendar-blush hover:text-non-photo-blue"
      >
        Please log in to edit and favorite recipies!
      </button>
    );
  if (!size) {
    size = isMobile ? "25px" : "50px";
  }
  if (isLoading) return <div className="" style={{ width: size, height: size }}>Loading...</div>;
  if (error) return <Link href={`/auth/login`}>Error! Please try again</Link>;
  return (
    <div style={{ height: `${size}` }}>
      <button
        className="shadow-none w-fit h-fit px-0"
        data-cy="favoritebutton"
        onClick={() => {
          fetch(`/api/favorite/add`, {
            method: "POST",
            body: JSON.stringify({ userSub: user.email, recipeId: recipeId }),
          }).then((res: Response) => {
            if (res.status === 200) {
              setFavorite(!favorite);
              if (!favorite) {
                notificationOnClick(
                  "success",
                  `Added ${recipeName} to favorites!`
                );
              } else {
                notificationOnClick(
                  "success",
                  `Removed ${recipeName} from favorites!`
                );
              }
            } else {
              notificationOnClick(
                `error`,
                `There was an error adding ${recipeName} to favorites.  Please try again later.`
              );
            }
          });
        }}
      >
        <FavoriteIcon
          props={{
            style: { height: `${size}`, width: `${size}` },
            fill: `${favorite ? "#d64933" : "none"}`,
          }}
        />
      </button>
    </div>
  );
}
