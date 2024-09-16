"use client";

import Pagination from "../ui/pagination";
import TableRow from "./TableRow";
import useSWR from "swr";
import AnimatedLoading from "../ui/loading/animatedloading";

export default function RecipesTable({ query }: { query: string }) {
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/recipes${query}`, fetcher);
  try {
    if (isLoading) return <AnimatedLoading name={"Recipes"}></AnimatedLoading>;
    if (data !== null) {
      const recipes: any = data[0][1];
      const recipesPerPage = 10;
      const recipeCount = Number(data[1][1]);
      const totalPages =
        Math.round(recipeCount / recipesPerPage) === 0
          ? 1
          : Math.round(recipeCount / recipesPerPage);
      return (
        <div
          style={{
            marginTop: "1.5rem",
            display: "flow-root",
          }}
        >
          <div
            style={{
              display: "inline-block",
              minWidth: "100%",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                borderRadius: "0.5rem",
                backgroundColor: "rgb(249 250 251)",
                padding: "0.5rem",
              }}
            >
              <table
                style={{
                  display: "table",
                  minWidth: "100%",
                  color: "rgb(17 24 39)",
                }}
              >
                <thead>
                  <tr>
                    <th scope="col">Recipe</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes?.map((recipe: any, index: number) => (
                    <TableRow
                      difficulty={recipe.difficulty}
                      name={recipe.name}
                      length={recipe.length}
                      image={recipe.image}
                      key={`${recipe.name}-tablerow`}
                      index={index}
                    ></TableRow>
                  ))}
                </tbody>
              </table>
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    return (
      <div
        style={{
          color: "white",
        }}
      >
        There was a problem reading/parsing data from the database:{" "}
        {String(error)}
      </div>
    );
  }
}
