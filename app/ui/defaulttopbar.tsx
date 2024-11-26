"use client";

import useResponsiveBreakpoints from "../lib/utils/useResponsiveBreakpoints";
import MobileMenuBurger from "./mobilemenuburger";
import ProfileButton from "./profilebutton";
import { useRouter } from "next/navigation";

export default function DefaultTopbar() {
  const router = useRouter();
  const [isMobile, isPortrait] = useResponsiveBreakpoints();
  return (
    <div style={{ display: "flex" }}>
      {isMobile && <MobileMenuBurger />}
      <div
        style={{
          display: "flex",
          width: "100%",
          border: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          <p style={{ fontSize: "100%", color: "white" }}>Recipe Buddy</p>
        </button>
      </div>
      <div style={{ paddingLeft: "" }}>
        <ProfileButton />
      </div>
    </div>
  );
}
