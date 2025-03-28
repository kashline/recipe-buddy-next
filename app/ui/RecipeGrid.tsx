"use client";

import RecipeCard from "@/app/ui/RecipeCard";
import { Session } from "next-auth";

export default function RecipeGrid({
  data,
  session,
}: {
  data: any;
  session: Session | null;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data.map((recipe: any, index: number) => {
        return (
          <div
            style={{ margin: "1%" }}
            key={`RecipeGrid-${index}`}
            className="py-2"
          >
            <RecipeCard
              session={session}
              data={recipe}
              key={`RecipeCard-${index}`}
            ></RecipeCard>
          </div>
        );
      })}
    </div>
  );
}
