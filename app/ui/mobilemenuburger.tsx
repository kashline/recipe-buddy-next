"use client";

import React from "react";
import BurgerMenu from "./icons/burgermenu";
import LogoutButton from "./buttons/logoutbutton";
import LoginButton from "./buttons/loginbutton";
import HomeIcon from "./icons/sidebaricons/homeicon";
import EditIcon from "./icons/editicon";
import MenuIcon from "./icons/sidebaricons/menuicon";
import BurgerMenuButton from "./burgermenubutton";
import ProfileIcon from "./icons/profileicon";
import RecipeIcon from "./icons/recipeicon";
import { Session } from "next-auth";

export default function MobileMenuBurger({
  session,
}: {
  session: Session | null;
}) {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const user = session?.user;
  const handleClick = () => {
    setMenuToggle(!menuToggle);
  };
  const wrapperRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className={`float-left relative`}>
      <button
        onClick={handleClick}
        className={`px-0 hover:shadow-none py-0 shadow-none float-right ${!menuToggle ? "visible" : "invisible"}`}
        data-cy='menuburgerbutton'
      >
        <BurgerMenu />
      </button>
      <div
        className={`text-lavendar-blush gap-10 fixed z-50 bg-gunmetal w-64 h-dvh transition-all ease-in duration-200 border-solid border-gray-500 border-2 rounded-lg ${!menuToggle ? "-left-64" : "left-0"}`}
        ref={wrapperRef}
      >
        <nav className="">
          <ul className="">
            <BurgerMenuButton
              title="Home"
              href="/"
              Icon={HomeIcon({ fill: "#eee5e9", width: 25, height: 25 })}
            />
            <BurgerMenuButton
              title="Browse Recipes"
              href="/recipes"
              Icon={MenuIcon({ fill: "#eee5e9", width: 25, height: 25 })}
            />
          </ul>
          {user && (
            <div>
              {" "}
              <hr className="h-0.5 border-b-lavendar-blush" />
              <ul>
                <BurgerMenuButton
                  title="Profile"
                  href="/profile/"
                  Icon={ProfileIcon({ fill: "#eee5e9", width: 25, height: 25 })}
                />
                <BurgerMenuButton
                  title="My Recipes"
                  href="/profile/recipes"
                  Icon={RecipeIcon({ fill: "#eee5e9", width: 25, height: 25 })}
                />
                <BurgerMenuButton
                  title="New Recipe"
                  href="/recipes/create"
                  Icon={EditIcon({ fill: "#eee5e9", width: 25, height: 25 })}
                />
              </ul>
              <LogoutButton />
            </div>
          )}
          {!user && <LoginButton />}
        </nav>
      </div>
    </div>
  );
}
