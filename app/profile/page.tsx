"use server";

import Image from "next/image";
import Login from "../ui/login";
import { useSession } from "next-auth/react";
import { auth } from "../../auth";

export default async function Page() {
  const session = await auth()
  const user = session?.user
  if (!user) {
    return (
      <div className="text-white">
        Please login to view this page
        <Login></Login>
      </div>
    );
  }
  // if (isLoading) return <div>Logging you in...</div>;
  // if (error) {
  //   return <div>{error}</div>;
  // }
  return (
    <div>
      <div className="mx-auto justify-center max-w-fit">
        <Image
          src={`${user?.image}` || "/chef-icon.png"}
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
      <div
        style={{
          marginTop: 4,
          display: "flex",
          flexGrow: "column",
          gap: "1rem",
        }}
      >
      </div>
    </div>
  );
}
