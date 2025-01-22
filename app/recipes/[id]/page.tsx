"use client";

import friendifyWords from "@/app/lib/utils/wordfriendifier";
import { unstable_noStore as noStore } from "next/cache";
import useSWR from "swr";
import "./styles.css";
import AnimatedLoading from "@/app/ui/loading/animatedloading";
import useResponsiveBreakpoints from "@/app/lib/utils/useResponsiveBreakpoints";
import {
  RecipeStepZype,
  RecipeZype,
} from "@/app/lib/data/zodels/Recipe";
import IngredientsTable from "@/app/ui/ingredientstable";
import RecipeQuickInfo from "@/app/ui/recipequickinfo";

export default function Page({ params }: { params: { id: string } }) {
  noStore();
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/recipes/${params.id}`,
    fetcher
  );
  if (error)
    return <div style={{ color: "white" }}>ERROR {JSON.stringify(error)}</div>;
  if (isLoading) return <AnimatedLoading name="recipe" />;
  const recipe: RecipeZype = data[0][1][0];
  const friendlyName = friendifyWords(recipe.title);
  const favorited =
    "UserRecipes" in data[0][1][0] && data[0][1][0].UserRecipes.length === 1
      ? true
      : false;
  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "2.25rem",
          lineHeight: "2.5rem",
          paddingBottom: "1rem",
        }}
        className="text-lavendar-blush"
      >
        <strong className="text-lavendar-blush">{friendlyName}</strong>
      </div>
      <RecipeQuickInfo recipe={recipe} favorited={favorited}/>
      <div className="flex">
        <div
          style={{
            marginRight: 20,
            width: "100%",
          }}
        >
          <div>
            <div
              style={{
                paddingTop: 20,
              }}
            >
              <p style={{ textAlign: "center", paddingBottom: 2 }}>
                <strong style={{ color: "white" }}>Instructions</strong>
              </p>
              {/* Recipe Steps */}
              {recipe.RecipeSteps.map((step: RecipeStepZype, index: number) => {
                return (
                  <div key={index}>
                    <div style={{ display: "flex" }} key={index}>
                      <p
                        style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        className="pb-0 my-auto"
                        key={index}
                      >
                        <strong style={{ color: "white" }}>
                          {step.step_number}
                        </strong>
                      </p>
                      <div className="flex w-full">
                        <div className="w-full flex my-auto">
                          {step.description}
                        </div>
                        <IngredientsTable
                            data={step.ingredients!}
                          ></IngredientsTable>
                      </div>
                    </div>
                    <hr
                      style={{
                        height: "1px",
                        border: "none",
                        backgroundColor: "gray",
                        width: "100%",
                      }}
                      className="py-0 my-0"
                    ></hr>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
