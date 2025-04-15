"use client";

import { RecipeZype } from "../lib/data/zodels/Recipe";
import friendifyWords from "../lib/utils/wordfriendifier";
import RecipeOptions from "./recipeoptions";
import Image from "next/image";
import useResponsiveBreakpoints from "../lib/utils/useResponsiveBreakpoints";
import * as React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";

/**
 * Quick info dropdowns for a recipe.
 * @param param0
 * @returns React.JSX.Element
 */
export default function RecipeQuickInfo({
  recipe,
  session,
}: {
  recipe: RecipeZype;
  session: Session | null;
}) {
  const friendlyName = friendifyWords(recipe.title);
  const [isMobile, isPortrait] = useResponsiveBreakpoints();
  const [isQiToggle, setIsQiToggle] = React.useState(false);
  const [isIngToggle, setIsIngToggle] = React.useState(false);
  const maxIngredientHeight = recipe.Ingredients!.length * 28 + 2;
  return (
    <div
      style={{
        width: "80%",
        blockSize: "fit-content",
        position: "relative",
        alignContent: "right",
        alignItems: "right",
      }}
      className="mx-auto"
    >
      <div
        style={{
          position: "relative",
          width: isMobile ? 256 : 512,
          height: isMobile ? 256 : 512,
        }}
        className="mx-auto justify-center"
      >
        <Image
          src={
            recipe.image === "undefined" || recipe.image === null
              ? "/chef-icon.png"
              : recipe.image
          }
          style={{}}
          alt={`Delicious ${friendlyName}`}
          fill={true}
        />
      </div>
      <div className="py-4">
        <RecipeOptions recipe={recipe} session={session} />
      </div>
      <div className="text-lavendar-blush text-center text-xl py-5 mx-auto">
        <span>{recipe.description}</span>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "black",
            }}
            className="bg-gray-600"
          >
            <div
              className="text-center hover:cursor-pointer"
              onClick={() => {
                setIsQiToggle(!isQiToggle);
              }}
            >
              <strong className="text-lavendar-blush">Quick Info</strong>
              {isQiToggle ? (
                <ChevronDownIcon
                  className="float-right stroke-lavendar-blush mr-0 ml-auto my-auto"
                  height={25}
                />
              ) : (
                <ChevronRightIcon
                  className="float-right stroke-lavendar-blush mr-0 ml-auto my-auto"
                  height={25}
                />
              )}
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all ease-in duration-300  ${isQiToggle ? `max-h-[114px]` : "max-h-0"}`}
          >
            <table className="w-full">
              <tbody>
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
                    Preparation Time
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {recipe.preparationTime}
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
                    Cooking Time
                  </td>
                  <td style={{ textAlign: "right" }}>{recipe.cookingTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "black",
            }}
            className="bg-gray-600"
          >
            <div
              className="text-center hover:cursor-pointer"
              onClick={() => {
                setIsIngToggle(!isIngToggle);
              }}
            >
              <strong style={{ color: "white" }}>Ingredients</strong>
              {isIngToggle ? (
                <ChevronDownIcon
                  className="float-right stroke-lavendar-blush mr-0 ml-auto my-auto"
                  height={25}
                />
              ) : (
                <ChevronRightIcon
                  className="float-right stroke-lavendar-blush mr-0 ml-auto my-auto"
                  height={25}
                />
              )}
            </div>
          </div>
          <div
            className={`overflow-hidden transition-height ease-in-out duration-700`}
            style={
              isIngToggle
                ? { maxHeight: maxIngredientHeight }
                : { maxHeight: 0 }
            }
          >
            <table className="mb-0 w-full">
              <tbody>
                {recipe.Ingredients!.map((ingredient: any, index: any) => {
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
                        className="text-lavendar-blush"
                        key={index}
                      >
                        {friendifyWords(ingredient.name)}
                      </td>
                      <td
                        key={`${index}-${ingredient.RecipeIngredient.quantity}`}
                        className="text-lavendar-blush"
                        style={{ textAlign: "right" }}
                      >
                        {friendifyWords(ingredient.RecipeIngredient.quantity)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
