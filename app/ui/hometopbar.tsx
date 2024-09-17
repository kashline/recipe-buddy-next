import Link from "next/link";
import Logo from "./logo";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileDropdown from "./profiledropdown";
import React from "react";
import ProfileDropdownMenu from "./profilebutton";
import ProfileButton from "./profilebutton";

export default function HomeTopbar() {
  return (
    <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
      <Logo></Logo>
      <div style={{ width: "100%", height: "100%" }}>
        <ProfileButton></ProfileButton>
      </div>
    </div>
  );
}
