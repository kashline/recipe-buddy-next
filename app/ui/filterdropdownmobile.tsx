import React from "react";
import Search from "./search";
import FilterMenuIcon from "./icons/filtermenuicon";

export default function FilterDropdownMobile() {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const handleClick = () => {
    setMenuToggle(!menuToggle);
  };
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
    <div
      className={`fixed z-20 w-[90%] bg-lavendar-blush justify-center items-center flex rounded-t-lg flex-col transition-all ease-in duration-200 ${!menuToggle ? "-bottom-64" : "bottom-0"}`}
      ref={wrapperRef}
    >
      <button
        className="hover:shadow-none shadow-none h-5 w-full justify-center items-center flex"
        onClick={handleClick}
      >
        <FilterMenuIcon />
      </button>
      <div className={`h-64 w-[90%]`}>
        <div className="flex h-fit w-full pb-4">
          <span className="pr-2">Name</span>
          <Search placeholder="Begin typing a recipe name" param="name" />
        </div>
        <div className="flex h-fit w-full">
          <span className="pr-2">Ingredients</span>
          <Search
            placeholder="Begin typing a recipe name"
            param="ingredients"
          />
        </div>
      </div>
    </div>
  );
}
