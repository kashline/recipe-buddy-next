"use server";

import Link from "next/link";
import MobileMenuBurger from "./mobilemenuburger";
import ProfileButton from "./profilebutton";
import { auth } from "../../auth";

/**
 * Default topbar that is present on all pages
 * @returns Promise<React.JSX.Element>
 */
export default async function DefaultTopbar() {
  const session = await auth();
  return (
    <div
      style={{ display: "flex", position: "sticky", top: 0 }}
      className="bg-gradient-to-tr from-black via-gunmetal to-black z-10 h-[42px]"
    >
      <MobileMenuBurger session={session} />
      <div
        style={{
          display: "flex",
          width: "100%",
          border: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href={"/"}>
          <p style={{ fontSize: "100%", color: "white" }}>Recipe Buddy</p>
        </Link>
      </div>
      <div style={{ paddingLeft: "" }}>
        <ProfileButton />
      </div>
    </div>
  );
}
