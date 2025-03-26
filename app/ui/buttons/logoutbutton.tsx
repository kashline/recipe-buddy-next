import Link from "next/link";
import LogoutIcon from "../icons/logouticon";

export default function LogoutButton(props?: any) {
  return (
    <div
      className="w-full h-10 bottom-0 absolute border-solid border-chili-red hover:border-red-800 border mb-6"
      {...props}
    >
      <Link className="flex text-lavendar-blush" href="/auth/logout">
        <p className="ml-3 my-auto">Logout</p>
        <div className="pt-1 ml-auto pr-2 my-auto">
          <LogoutIcon />
        </div>
      </Link>
    </div>
  );
}
