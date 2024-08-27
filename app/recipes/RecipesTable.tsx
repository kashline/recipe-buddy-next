"use server";

import { unstable_noStore as noStore } from "next/cache";
import Pagination from "../ui/pagination";
import TableRow from "./TableRow";

export default async function RecipesTable({ query }: { query: string }) {
  try {
    noStore();
    const recipeData: Map<string, Object> = new Map(
      await (await fetch(`${process.env.APP_URL}/api/recipes${query}`)).json(),
    );
    const recipes: any = recipeData.get("recipes");
    const recipesPerPage = 10;
    const recipeCount = Number(recipeData.get("count"));
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
                  <th scope="col">
                    <span>Edit</span>
                  </th>
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
