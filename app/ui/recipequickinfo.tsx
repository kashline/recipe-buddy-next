"use client";

import Link from "next/link";
import { RecipeZype } from "../lib/data/zodels/Recipe";
import friendifyWords from "../lib/utils/wordfriendifier";
import RecipeOptions from "./recipeoptions";
import Image from "next/image";
import useResponsiveBreakpoints from "../lib/utils/useResponsiveBreakpoints";
import * as React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function RecipeQuickInfo({
  recipe,
  favorited,
}: {
  recipe: RecipeZype;
  favorited: boolean;
}) {
  const friendlyName = friendifyWords(recipe.title);
  const [isMobile, isPortrait] = useResponsiveBreakpoints();
  const [isQiToggle, setIsQiToggle] = React.useState(false);
  const [isIngToggle, setIsIngToggle] = React.useState(false);
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
        <RecipeOptions recipe={recipe} favorited={favorited} />
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
              // colSpan={100}
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
            className={`overflow-hidden transition-all ease-in duration-200 ${isQiToggle ? "max-h-96" : "max-h-0"}`}
          >
            {/* {isQiToggle && ( */}
            <table>
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
                <tr
                  style={{
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderColor: "black",
                  }}
                >
                  <td style={{ textAlign: "center" }} colSpan={100}>
                    <Link
                      href={recipe.video !== null ? recipe.video : ""}
                      style={{ color: "white" }}
                    >
                      Instructional Video Link
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* )} */}
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
            className={`overflow-hidden transition-all ease-in duration-500`}
            style={isIngToggle ? { maxHeight: 1024 } : { maxHeight: 0 }}
          >
            <table className="mb-0">
              <tbody>
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
