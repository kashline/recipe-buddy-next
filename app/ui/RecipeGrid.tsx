"use client";

import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ data }: { data: any }) {
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
          <div style={{ margin: "1%" }} key={`RecipeGrid-${index}`}>
            <RecipeCard data={recipe} key={`RecipeCard-${index}`}></RecipeCard>
          </div>
        );
      })}
    </div>
  );
}
