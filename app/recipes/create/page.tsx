"use client";

import * as React from "react";
import CreateRecipeForm from "./CreateRecipeForm";

export default function Page() {
  return (
    <div className="justify-center">
      <h1 className="flex w-full justify-center text-lavendar-blush text-4xl pb-2">
        Create Recipe
      </h1>
      <CreateRecipeForm/>
    </div>
  );
};
