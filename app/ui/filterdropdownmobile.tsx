import React from "react";
import FilterMenuIcon from "./icons/filtermenuicon";

/**
 * Mobile version of FilterDropdown.  Handles search filtering (WIP)
 * @returns React.JSX.Element
 */
export default function FilterDropdownMobile() {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const handleClick = () => {
    setMenuToggle(!menuToggle);
  };
  function useOutsideClick(ref: React.RefObject<HTMLInputElement | null>) {
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
    <div className="">
      <div
        className={`fixed h-full w-full z-20 ${!menuToggle ? "pointer-events-none" : ""} ml-[-5%] mt-[-30%]`}
      ></div>
      <div
        className={`fixed z-20 w-[90%] bg-lavendar-blush justify-center items-center flex rounded-t-lg flex-col transition-all ease-in duration-200 ${!menuToggle ? "-bottom-32" : "bottom-0"}`}
        ref={wrapperRef}
      >
        <button
          className="hover:shadow-none shadow-none h-4 w-full justify-center items-center flex my-2"
          onClick={handleClick}
        >
          <FilterMenuIcon />
        </button>
        <div className={`h-32 w-[90%]`}>
          <div className="flex w-full pb-4">
            <span className="pr-2">Name</span>
          </div>
          <div className="flex w-full">
            <span className="pr-2">Ingredients</span>
          </div>
        </div>
      </div>
    </div>
  );
}
