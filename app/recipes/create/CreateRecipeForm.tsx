"use client";

import * as React from "react";
import IngredientsForm from "./IngredientsForm";
import RecipeStepsForm from "./RecipeStepsForm";
import {
  setCookingTime,
  setDescription,
  setDifficulty,
  setOwner,
  setPreparationTime,
  setServings,
  setTags,
  setTitle,
} from "@/app/lib/features/recipe/createRecipeSlice";
import { selectCreateRecipe } from "@/app/lib/features/recipe/createRecipeSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import "./styles.css";
import CancelRecipe from "@/app/ui/popups/cancelrecipe";
import { Session } from "next-auth";

export default function Page({ session }: { session: Session | null }) {
  const selectRecipe = useAppSelector(selectCreateRecipe);
  const dispatch = useAppDispatch();
  const [submit, setSubmit] = React.useState("idle");
  const [formValid, setFormValid] = React.useState(true);
  if (!session){
    return(<div className="text-lavendar-blush">You must be logged in to view this page!</div>)
  }
  const user = session.user
  // if (isLoading) {
  //   return <>Loading</>;
  // }
  // if (!user) {
  //   return <>You must login</>;
  // }
  // if (error) {
  //   return <>error</>;
  // }
  const handleChange = (val: any, setFunction: Function) => {
    if (selectRecipe.owner === "") {
      dispatch(setOwner(user!.email!));
    }
    dispatch(setFunction(val));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();
    setFormValid(isValid);
    const firstInvalidField = formElement.querySelector(
      ":invalid"
    ) as HTMLInputElement;
    firstInvalidField?.focus();
    if (isValid) {
      try {
        const res = await fetch(`/api/recipes/new`, {
          body: JSON.stringify(selectRecipe),
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
    }
  };
  const onInvalid = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    return (
      <span className="invalid:visible text-chili-red">
        You must supply a title
      </span>
    );
  };
  return (
    <div className="justify-center">
      <div className="border-2 border-black py-2 w-full max-w-[600px] justify-center mx-auto">
        <form className="mx-0" onSubmit={handleSubmit} noValidate={true}>
          <div className=" w-full px-2">
            <label className="text-lavendar-blush my-auto pr-2 font-sans">
              Title:
            </label>
            <input
              required={true}
              type="text"
              name="title"
              onInvalid={onInvalid}
              onChange={(e) => {
                handleChange(e.target.value, setTitle);
              }}
              value={selectRecipe.title}
              className="bg-gunmetal text-lavendar-blush h-8 rounded-md border-gray-500 w-full"
            />
            {selectRecipe.title === "" && !formValid && (
              <div className="text-chili-red">{`Title is required`}</div>
            )}
          </div>
          {/* <TextInput setFunction={setTitle} errorText="Title is required"/> */}
          <div className=" w-full px-2">
            <label className="text-lavendar-blush my-auto pr-2 font-sans">
              Description:
            </label>
            <textarea
              name="description"
              required={true}
              cols={40}
              rows={6}
              onChange={(e) => {
                handleChange(e.target.value, setDescription);
              }}
              value={selectRecipe.description}
              className="bg-gunmetal text-lavendar-blush w-full rounded-md border-gray-500"
            />
            {selectRecipe.description === "" && !formValid && (
              <div className="text-chili-red">{`Description is required`}</div>
            )}
          </div>
          <div className=" w-full px-2">
            <label className="text-lavendar-blush my-auto pr-2 font-sans">
              Preparation Time:
            </label>
            <div className="flex">
              <input
                required={true}
                type="number"
                name="ptime"
                min={0}
                onChange={(e) => {
                  handleChange(e.target.value, setPreparationTime);
                }}
                value={selectRecipe.preparationTime}
                className="bg-gunmetal text-lavendar-blush h-8 rounded-md border-gray-500 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-lavendar-blush pl-2">minutes</span>
            </div>
          </div>
          <div className=" w-full px-2">
            <label className="text-lavendar-blush my-auto pr-2 font-sans">
              Cooking Time:
            </label>
            <div className="flex">
              <input
                required={true}
                type="number"
                name="ctime"
                min={0}
                onChange={(e) => {
                  handleChange(e.target.value, setCookingTime);
                }}
                value={selectRecipe.cookingTime}
                className="bg-gunmetal text-lavendar-blush h-8 rounded-md border-gray-500 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-lavendar-blush pl-2">minutes</span>
            </div>
          </div>
          <div className=" w-full px-2">
            <label className="text-lavendar-blush my-auto pr-2 font-sans">
              Servings:
            </label>
            <select
              name="servings"
              onChange={(e) => {
                handleChange(e.target.value, setServings);
              }}
              value={selectRecipe.servings}
              className="bg-gunmetal text-lavendar-blush h-8 rounded-md border-gray-500 w-full py-0"
            >
              {Array.from(Array(10).keys()).map((num, index) => {
                return (
                  <option value={num + 1} key={index}>
                    {num + 1}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" w-full px-2">
            <label className="text-lavendar-blush my-auto pr-2 font-sans">
              Difficulty:
            </label>
            <select
              name="difficulty"
              className="bg-gunmetal text-lavendar-blush h-8 rounded-md border-gray-500 w-full py-0"
              onChange={(e) => {
                handleChange(e.target.value, setDifficulty);
              }}
              value={selectRecipe.difficulty}
            >
              {["very short", "short", "medium", "hard", "very hard"].map(
                (num, index) => {
                  return <option value={num} key={index}>{`${num}`}</option>;
                }
              )}
            </select>
            {/* <div>
              <label className="text-lavendar-blush my-auto pr-2 font-sans">
                Tags:
              </label>
              <TagsInput
                value={selectRecipe.tags}
                onChange={(e) => {
                  handleChange(e, setTags);
                }}
                name="tags"
                placeHolder="Enter tags..."
              />
            </div> */}
          </div>
          <div className="border-t-2 border-black mt-4">
            <h1 className="text-4xl text-center text-lavendar-blush pt-2">
              Ingredients:
            </h1>
            <IngredientsForm />
          </div>
          <div className="border-t-2 border-black">
            <h1 className="text-4xl text-center text-lavendar-blush pt-2">
              Steps:
            </h1>
            <RecipeStepsForm />
          </div>
          {/* <div className="border-t-2 border-black">
            <h1 className="text-4xl text-center text-lavendar-blush pt-2">
              Step Ingredients
            </h1>
            <div className="flex">
              <span className="text-lavendar-blush justify-center mx-auto">
                Here you can associate ingredients with each step
              </span>
            </div>
            {selectRecipe.Ingredients.map((ingredient, index) => {
              return (
                <div className="" key={index}>
                  <table></table>
                </div>
              );
            })}
            <RecipeStepsForm />
          </div> */}
          <div className="py-2 w-full max-w-[600px] justify-center mx-auto flex gap-6 pt-8">
            <div className="">
              <button
                className="text-lavendar-blush border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div>
              <CancelRecipe />
            </div>
          </div>
          <div className="text-center h-8">
            {submit === "success" && (
              <div className="text-lavendar-blush">
                Sucessfully submitted recipe
              </div>
            )}
            {submit === "failed" && (
              <div className="text-lavendar-blush">Failed to submit recipe</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
