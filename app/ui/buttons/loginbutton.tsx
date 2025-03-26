import Link from "next/link";
import LoginIcon from "../icons/loginicon";

export default function LoginButton() {
  return (
    <div className="w-full h-10 bottom-0 absolute border-solid border-green-400 border-2 hover:border-green-600 mb-6">
      <Link className="flex text-lavendar-blush" href="/auth/login">
        <p className="ml-3 my-auto">Login</p>
        <div className="pt-1 ml-auto pr-2 my-auto">
          <LoginIcon />
        </div>
      </Link>
    </div>
  );
}
