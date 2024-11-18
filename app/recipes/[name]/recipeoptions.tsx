"use client";

import FavoriteButton from "@/app/ui/FavoriteButton";
import EditIcon from "@/app/ui/icons/editicon";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export default function RecipeOptions({
  recipeId,
  favorited,
}: {
  recipeId: number;
  favorited: boolean;
}) {
  const path = usePathname();
  const { user, error, isLoading } = useUser();
  if (isLoading) return <h1>Loading...</h1>;
  if (error)
    return <Link href={`/api/auth/login`}>Error! Please try again</Link>;
  if (!user)
    return (
      <Link href={`/api/auth/login`} style={{ color: "white" }}>
        Please log in to edit and favorite recipies!
      </Link>
    );
  return (
    <div
      style={{
        display: "grid",
        gridAutoColumns: "minmax(0, 1fr)",
        gridAutoFlow: "column",
      }}
    >
      <Link className="h-fit justify-center align-middle mx-auto" href={`${path}/edit`}>
        <EditIcon/>
      </Link>
      <FavoriteButton recipeId={recipeId} favorited={favorited} />
    </div>
  );
}
