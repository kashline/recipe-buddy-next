"use client";

import * as React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import CreateRecipeForm from "./CreateRecipeForm";

export default withPageAuthRequired(function Page() {
  return (
    <div className="justify-center">
      <h1 className="flex w-full justify-center text-lavendar-blush text-4xl pb-2">
        Create Recipe
      </h1>
      <CreateRecipeForm/>
    </div>
  );
});
