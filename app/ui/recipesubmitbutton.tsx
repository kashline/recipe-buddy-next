import React from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { selectCreateRecipe, setOwner } from "../lib/features/recipe/createRecipeSlice";
import Button from "./button";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function RecipeSubmitButton() {
  const [submit, setSubmit] = React.useState("idle");
  const createRecipe = useAppSelector(selectCreateRecipe);
  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/recipes/new`, {
        body: JSON.stringify(createRecipe),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        setSubmit("failed");
      } else {
        setSubmit("success");
      }
    } catch (error) {
      console.log(`There was an error sumbitting the recipe: ${error}`);
    }
  };
  switch (submit) {
    case "idle":
      return (
        <div className="text-lavendar-blush border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8">
          <button className="" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      );
    case "failed":
      return (
        <div className=" content-center">
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <p>Failed to submit recipe!</p>
        </div>
      );
    case "success":
      return (
        <div className="text-center flex">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <p>Recipe submitted successfully!</p>
          <div style={{ display: "flex" }}>
            <Link href={`/recipes/${createRecipe.title}`}>
              <Button>Return</Button>
            </Link>
          </div>
        </div>
      );
    default:
      break;
  }
}
