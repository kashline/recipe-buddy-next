"use client";

import friendifyWords from "@/app/lib/utils/wordfriendifier";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import RecipeOptions from "./recipeoptions";
import "./styles.css";

export default function Page({ params }: { params: { name: string } }) {
  noStore();
  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/recipes?name=${params.name}`,
    fetcher,
  );
  if (error)
    return <div style={{ color: "white" }}>ERROR {JSON.stringify(error)}</div>;
  if (isLoading) return <>Loading</>;
  const recipe: any = data[0][1][0];
  const friendlyName = friendifyWords(recipe.name);
  return (
    <div style={{ color: "white" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.25rem",
          lineHeight: "2.5rem",
          paddingBottom: "1rem",
        }}
      >
        <strong style={{ color: "white" }}>{friendlyName}</strong>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: 'center',
          flexDirection: "row",
        }}
      >
        <div
          style={{
            marginRight: 20,
            width: "100%",
            paddingRight: 15,
          }}
        >
          <div>
            <div
              style={{
                paddingTop: 20,
              }}
            >
              <p style={{ textAlign: "center", paddingBottom: 4 }}>
                <strong style={{ color: "white" }}>Recipe Steps</strong>
              </p>
              {/* Recipe Steps */}
              {recipe.RecipeSteps.map((recipe: any, index: number) => {
                return (
                  <div style={{ display: "flex" }} key={index}>
                    <p
                      style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      key={index}
                    >
                      <strong style={{ color: "white" }}>
                        {recipe.step_number}
                      </strong>
                    </p>
                    <div style={{ width: "100%" }}>
                      {recipe.step}
                      <hr
                        style={{
                          height: "1px",
                          border: "none",
                          backgroundColor: "gray",
                          width: "100%",
                        }}
                      ></hr>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 250,
            blockSize: "fit-content",
            position: "relative",
            alignContent: "right",
            alignItems: "right",
          }}
        >
          <RecipeOptions
            recipeId={Number(recipe.id)}
            favorited={
              "UserRecipes" in data[0][1][0] &&
              data[0][1][0].UserRecipes.length === 1
                ? true
                : false
            }
          ></RecipeOptions>
          <div
            style={{
              position: "relative",
              width: 250,
              height: 250,
              paddingRight: 100,
            }}
          >
            <Image
              src={recipe.image || "/chef-icon.png"}
              style={{}}
              alt={`Delicious ${friendlyName}`}
              fill={true}
            />
          </div>
          <table
            style={{
              width: "100%",
            }}
          >
            <tbody>
              <tr
                style={{
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                }}
              >
                <td style={{ textAlign: "center" }} colSpan={100}>
                  <strong style={{ color: "white" }}>Quick Info</strong>
                </td>
              </tr>
              <tr
                style={{
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                }}
              >
                <td
                  style={{
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderColor: "black",
                  }}
                >
                  Difficulty
                </td>
                <td style={{ textAlign: "right" }}>{recipe.difficulty}</td>
              </tr>
              <tr
                style={{
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                }}
              >
                <td
                  style={{
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderColor: "black",
                  }}
                >
                  Length
                </td>
                <td style={{ textAlign: "right" }}>{recipe.length}</td>
              </tr>
              <tr
                style={{
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                }}
              >
                <td style={{ textAlign: "center" }} colSpan={100}>
                  <Link href={recipe.video} style={{ color: "white" }}>
                    Instructional Video Link
                  </Link>
                </td>
              </tr>
              <tr
                style={{
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                }}
              >
                <td style={{ textAlign: "center" }} colSpan={100}>
                  <strong style={{ color: "white" }}>Ingredients</strong>
                </td>
              </tr>
              {recipe.Ingredients.map((ingredient: any, index: any) => {
                return (
                  <tr
                    key={index}
                    style={{
                      borderStyle: "solid",
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                  >
                    <td
                      style={{
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderColor: "black",
                      }}
                      key={index}
                    >
                      {ingredient.name}
                    </td>
                    <td
                      key={`${index}-${ingredient.RecipeIngredient.quantity}`}
                      style={{ textAlign: "right" }}
                    >
                      {ingredient.RecipeIngredient.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
