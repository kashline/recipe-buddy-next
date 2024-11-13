"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function TopNav() {
  const pathName = usePathname();
  return (
    <div>
      <nav style={{ marginTop: "0px" }} id={"nav"}>
        <ul className="links">
          <li className={pathName === "/" ? "active" : ""}>
            <a href="/">Home</a>
          </li>
          <li className={pathName === "/recipes" ? "active" : ""}>
            <a href="/recipes">Browse Recipes</a>
          </li>
          <li className={pathName === "/recipes/create" ? "active" : ""}>
            <a href="/recipes/create">Create New Recipe</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
