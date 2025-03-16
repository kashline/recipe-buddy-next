"use client";

import MobileMenuBurger from "./mobilemenuburger";
import ProfileButton from "./profilebutton";
import { useRouter } from "next/navigation";

export default function DefaultTopbar() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", position: 'sticky', top: 0 }} className="bg-gradient-to-tr from-black via-gunmetal to-black z-10 h-[42px]">
      <MobileMenuBurger/>
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
