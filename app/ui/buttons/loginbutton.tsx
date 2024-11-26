import LoginIcon from "../icons/loginicon";

export default function LoginButton() {
  return (
    <div className="w-full h-10 bottom-0 absolute border-solid">
      <a className="flex text-lavendar-blush" href="/api/auth/login">
        <p className="ml-3">Login</p>
        <div className="pt-1 ml-auto pr-2">
          <LoginIcon />
        </div>
      </a>
    </div>
  );
}
