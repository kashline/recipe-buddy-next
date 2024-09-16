'use client'

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
      {data.map((recipe: any) => {
        return (
          <div style={{ margin: "1%" }}>
            <RecipeCard data={recipe}></RecipeCard>
          </div>
        );
      })}
    </div>
  );
}
