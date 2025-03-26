"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TopNav() {
  const pathName = usePathname();
  return (
    <div className="">
      <nav style={{ marginTop: "0px" }} id={"nav"} className="">
        <ul className="links">
          <li className={pathName === "/" ? "active" : ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathName === "/recipes" ? "active" : ""}>
            <Link href="/recipes">Browse Recipes</Link>
          </li>
          <li className={pathName === "/recipes/create" ? "active" : ""}>
            <Link href="/recipes/create">Create New Recipe</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
