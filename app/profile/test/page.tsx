"use client";

import RecipesNavButton from "@/app/ui/nav/RecipesNavButton";
import burger from "../../../public/burger.jpg";
import Image from "next/image";

export default function Page() {
  return (
    <div
      style={
        {
          // opacity: 0.65
        }
      }
    >
      <RecipesNavButton />
    </div>
  );
}
