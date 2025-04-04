"use client";

import React from "react";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DeleteRecipe from "./popups/deleterecipe";

export default function DangerZone({
  recipeName,
  recipeID,
}: {
  recipeName: string;
  recipeID: number;
}) {
  const [toggle, setToggle] = React.useState(false);
  const myRef = React.useRef<null | HTMLDivElement>(null);
  React.useEffect(() => {
    if (myRef.current !== null) {
      myRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  });
  return (
    <div className="border-[1px] border-chili-red">
      <button
        style={{ width: "100%", height: 4 }}
        data-cy="dangerzonebutton"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <div className="flex">
          {toggle && (
            <ChevronDownIcon
              className="stroke-lavendar-blush my-auto"
              style={{ height: 16 }}
            />
          )}
          {!toggle && (
            <ChevronRightIcon
              className="stroke-lavendar-blush my-auto"
              style={{ height: 16 }}
            />
          )}
          <p className="pl-4 text-lavendar-blush">Danger Zone</p>
        </div>
      </button>
      {toggle && (
        <div className="pt-5" ref={myRef}>
          <hr className=" h-px border-none bg-gray-500 w-[95%] mx-auto"></hr>{" "}
          <div className="flex w-full pt-5">
            <p className="text-lavendar-blush mr-auto ml-[2%] my-auto">
              Delete Recipe
            </p>
            <div className="mr-0">
              <DeleteRecipe recipeName={recipeName} recipeID={recipeID} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
