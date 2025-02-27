"use client";

import React from "react";
import Search from "../ui/search";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useResponsiveBreakpoints from "../lib/utils/useResponsiveBreakpoints";
import FilterDropdownMobile from "../ui/filterdropdownmobile";

export default function FilterDropdown() {
  const [toggle, setToggle] = React.useState(false);
  const [isMobile, isPortrait] = useResponsiveBreakpoints();
  if (!isMobile)
    return (
      <div style={{ width: "100%", margin: "auto" }}>
        <button
          style={{ width: "100%", display: "flex" }}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              height: "100%",
              alignItems: "center",
            }}
          >
            {(toggle && (
              <ChevronDownIcon style={{ height: 16, float: "left" }} />
            )) || <ChevronRightIcon style={{ height: 16, float: "left" }} />}
          </div>
          <div style={{ color: "white", alignContent: "center" }}>
            <p style={{ display: "flex" }}>Filters...</p>
          </div>
        </button>

        <hr
          style={{
            height: "1px",
            border: "none",
            backgroundColor: "white",
            margin: "auto",
          }}
        ></hr>
        {toggle && (
          <form
            style={{
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "1rem",
              }}
            >
              {/* <Search
                placeholder="Begin typing to search by recipe title, keywords, description, difficulty, etc..."
                param="term"
              ></Search> */}
            </div>
          </form>
        )}
      </div>
    );
  else {
    return <FilterDropdownMobile />;
  }
}
