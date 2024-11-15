import LogoutIcon from "../icons/logouticon";

export default function LogoutButton() {
  return (
    <div className="w-full h-10 bottom-0 absolute border-solid border-chili-red border">
      <a className="flex text-lavendar-blush" href="/api/auth/logout">
        <p className="ml-3">Logout</p>
        <div className="pt-1 ml-auto pr-2">
          <LogoutIcon />
        </div>
      </a>
    </div>
  );
}
