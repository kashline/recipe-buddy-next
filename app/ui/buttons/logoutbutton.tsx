import Link from "next/link";
import LogoutIcon from "../icons/logouticon";
import { signOut } from "next-auth/react";

export default function LogoutButton(props?: any) {
  return (
    <div
      className="w-full h-10 bottom-0 absolute border-solid border-chili-red hover:border-red-800 border"
      {...props}
    >
      <button className="flex text-lavendar-blush w-full" onClick={() => signOut()}>
        <p className="ml-3 my-auto">Logout</p>
        <div className="pt-1 ml-auto pr-2 my-auto">
          <LogoutIcon />
        </div>
      </button>
    </div>
  );
}
