import React from "react";
import BurgerMenu from "./icons/burgermenu";
import { usePathname } from "next/navigation";
import LogoutIcon from "./icons/logouticon";
import { useUser } from "@auth0/nextjs-auth0/client";
import LogoutButton from "./buttons/logoutbutton";
import LoginButton from "./buttons/loginbutton";

export default function MobileMenuBurger() {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const { user, error, isLoading } = useUser();
  const handleClick = () => {
    setMenuToggle(!menuToggle);
  };
  const pathName = usePathname();
  function useOutsideClick(ref: React.RefObject<HTMLInputElement>) {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setMenuToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    React.useEffect(() => {
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  const wrapperRef = React.useRef<HTMLInputElement>(null);
  useOutsideClick(wrapperRef);
  return (
    <div className="float-left relative">
      <button
        onClick={handleClick}
        className="px-0 hover:shadow-none py-0 shadow-none float-right"
      >
        <BurgerMenu />
      </button>
      <div
        className={`text-lavendar-blush z-50 absolute bg-gunmetal w-64 h-screen transition-all ease-in duration-300 ${!menuToggle ? "-left-64" : "left-0"}`}
        ref={wrapperRef}
      >
        <button
          onClick={handleClick}
          className="px-0 hover:shadow-none py-0 shadow-none"
        >
          <BurgerMenu />
        </button>
        <nav className="">
          <ul className="links">
            <li className={pathName === "/" ? "active" : ""}>
              <a
                href="/"
                className="text-lavendar-blush hover:text-non-photo-blue"
              >
                Home
              </a>
            </li>
            <li className={pathName === "/recipes" ? "active" : ""}>
              <a
                href="/recipes"
                className="text-lavendar-blush hover:text-non-photo-blue"
              >
                Browse Recipes
              </a>
            </li>
            <li className={pathName === "/recipes/create" ? "active" : ""}>
              <a
                href="/recipes/create"
                className="text-lavendar-blush hover:text-non-photo-blue"
              >
                Create New Recipe
              </a>
            </li>
          </ul>
          {user && (
            <div>
              {" "}
              <hr className="h-0.5 border-b-lavendar-blush" />
              <ul>
                <li>
                  <a
                    href="/profile"
                    className="text-lavendar-blush hover:text-non-photo-blue"
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/profile/recipes"
                    className="text-lavendar-blush hover:text-non-photo-blue"
                  >
                    My Recipes
                  </a>
                </li>
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
