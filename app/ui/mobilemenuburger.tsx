import React from "react";
import BurgerMenu from "./icons/burgermenu";
import { usePathname } from "next/navigation";

export default function MobileMenuBurger() {
  const [menuToggle, setMenuToggle] = React.useState(false);
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
  if (!menuToggle) {
    return (
      <div className="float-left relative">
        <button
          onClick={handleClick}
          className="px-0 hover:shadow-none py-0 shadow-none float-right"
        >
          <BurgerMenu />
        </button>
      </div>
    );
  } else {
    return (
      <div className="float-left relative">
        <button
          onClick={handleClick}
          className="px-0 hover:shadow-none py-0 shadow-none float-right"
        >
          <BurgerMenu />
        </button>
        <div
          className="text-lavendar-blush ml-0.5 w-9 h-full z-50 absolute transition-transform ease-in duration-1000"
          ref={wrapperRef}
        >
          <button
            onClick={handleClick}
            className="px-0 hover:shadow-none py-0 shadow-none float-right"
          >
            <BurgerMenu />
          </button>
          <nav className="w-64 bg-gunmetal h-screen">
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
          </nav>
        </div>
      </div>
    );
  }
}
