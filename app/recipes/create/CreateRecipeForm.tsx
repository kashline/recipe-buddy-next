"use client";

import Dropdown from "@/app/ui/dropdown";
import {
  setLength,
  setDifficulty,
  setName,
  setVideo,
  selectCreateRecipe,
} from "@/app/lib/features/recipe/createRecipeSlice";

import Input from "@/app/ui/input";
import "./styles.scss";
import IngredientsForm from "./IngredientsForm";
import RecipeStepsForm from "./RecipeStepsForm";
import React from "react";
import RecipeSubmitButton from "@/app/ui/recipesubmitbutton";
import CancelRecipe from "@/app/ui/popups/cancelrecipe";
import { useAppSelector } from "@/app/lib/hooks";
import { usePathname } from "next/navigation";

export default function CreateRecipeForm() {
  const createRecipe = useAppSelector(selectCreateRecipe);
  const pathName = usePathname();
  const boxStyle = {
    border: "solid",
    padding: "25px",
    margin: "20px",
    borderRadius: "0.375rem",
    borderColor: "#EEE5E9",
    borderWidth: "1px",
  };
  return (
    <div style={{ width: "60%", marginInline: "auto" }}>
      <h1 style={{ textAlign: "center", paddingBottom: 4 }}>
        <strong style={{ color: "#EEE5E9", fontSize: 45 }}>
          {pathName.includes("edit") ? "Edit Recipe" : "Create Recipe"}
        </strong>
      </h1>
      <div>
        <div className="top-div" style={{ backgroundColor: "inherit" }}>
          <Input setFunction={setName} label="name" required={true}></Input>
          <Input setFunction={setVideo} label="video" required={true}></Input>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Dropdown
              options={["Very Short", "Short", "Medium", "Long", "Very Long"]}
              placeholder={
                createRecipe.length !== ""
                  ? createRecipe.length
                  : "Select Length"
              }
              setFunction={setLength}
              label="length"
            ></Dropdown>
            <Dropdown
              options={["Very Easy", "Easy", "Medium", "Hard", "Very Hard"]}
              placeholder={
                createRecipe.difficulty !== ""
                  ? createRecipe.difficulty
                  : "Select Difficulty"
              }
              setFunction={setDifficulty}
              label="difficulty"
            ></Dropdown>
          </div>
        </div>
        <div className="form-div">
          <div style={boxStyle}>
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <label>
                <strong style={{ color: "#EEE5E9", fontSize: 25 }}>
                  Ingredients
                </strong>
              </label>
            </div>
            <IngredientsForm></IngredientsForm>
          </div>
          <div style={boxStyle}>
            <div className="text-center">
              <label>
                <strong style={{ color: "#EEE5E9", fontSize: 25 }}>
                  Steps
                </strong>
              </label>
            </div>
            <RecipeStepsForm></RecipeStepsForm>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "auto" }}>
        <RecipeSubmitButton></RecipeSubmitButton>
        <CancelRecipe></CancelRecipe>
      </div>
    </div>
  );
}
