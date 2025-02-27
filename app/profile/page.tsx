"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Login from "../ui/login";

export default function Page() {
  const { user, error, isLoading } = useUser();
  if (!user) {
    return (
      <div className="text-white">
        Please login to view this page
        <Login></Login>
      </div>
    );
  }
  if (isLoading) return <div>Logging you in...</div>;
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <div className="mx-auto justify-center max-w-fit">
        <Image
          src={`${user?.picture}` || "/chef-icon.png"}
          style={{
            marginLeft: "auto",
            marginRight: 0,
            marginTop: 0,
            marginBottom: "auto",
            float: "left",
          }}
          width={250}
          height={250}
          alt={`Profile picture`}
        />
        <p className="text-lavendar-blush text-center text-3xl">{user.name}</p>
      </div>
      {/* <h2 className="text-lavendar-blush font-thin text-center">
        Welcome {user.name?.split(" ")[0]}!
      </h2> */}
      
      <div
        style={{
          marginTop: 4,
          display: "flex",
          flexGrow: "column",
          gap: "1rem",
        }}
      >
        {/* <ProfileSidebar></ProfileSidebar> */}
      </div>
    </div>
  );
}
