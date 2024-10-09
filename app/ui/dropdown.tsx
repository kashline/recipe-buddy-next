import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  CreateRecipeState,
  selectCreateRecipe,
} from "../lib/features/recipe/createRecipeSlice";

export default function Dropdown({
  options,
  setFunction,
  label,
}: {
  options: string[];
  placeholder: string;
  setFunction: Function;
  label: string;
}) {
  const friendlyLabel = `${label[0].toUpperCase()}${label.slice(1)}`;
  const createRecipe = useAppSelector(selectCreateRecipe);
  const dispatch = useAppDispatch();
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    dispatch(setFunction(event.currentTarget.textContent));
  };
  return (
    <div
      style={{
        display: "flex",
        paddingRight: 10,
        width: "fit-content",
        maxWidth: "33%",
      }}
    >
      <label
        style={{ marginTop: "0.5rem", paddingRight: "0.5rem", color: "white" }}
      >
        {friendlyLabel}
      </label>
      <Menu>
        <MenuButton
          style={{
            borderColor: "inherit",
            boxShadow: "none",
            border: "solid",
            borderWidth: "1px",
            display: "flex",
            height: "2rem",
            borderRadius: "0.25rem",
            padding: 0,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                paddingRight: "2rem",
                paddingLeft: "2rem",
                marginBottom: 0,
              }}
            >
              {createRecipe[label as keyof CreateRecipeState] as String}
            </p>
          </div>
          <ChevronDownIcon
            className=""
            style={{
              height: 20,
              width: 20,
              color: "rgb(96 165 250)",
              alignContent: "right",
              float: "right",
            }}
            aria-hidden="true"
          />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom start"
            style={{}}
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {options.map((option, index) => {
              return (
                <MenuItem key={index}>
                  {
                    <button
                      style={{
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        paddingLeft: 5,
                        boxShadow: "none",
                        borderStyle: "solid",
                        borderWidth: 1,
                        position: "relative",
                        backgroundColor: "#1e252d",
                      }}
                      onClick={handleOnClick}
                    >
                      {option}
                    </button>
                  }
                </MenuItem>
              );
            })}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
