"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import ProfileSidebar from "./profilesidebar";
import Login from "../ui/login";

export default function Page() {
  const { user, error, isLoading } = useUser();
  if (!user) {
    return (
      <>
        Please login to view this page
        <Login></Login>
      </>
    );
  }
  if (isLoading) return <div>Logging you in...</div>;
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <p>Welcome {user?.name}</p>
      <div>
        <Image
          src={`${user?.picture}` || "/chef-icon.png"}
          style={{
            marginLeft: "auto",
            marginRight: 0,
            marginTop: 0,
            marginBottom: "auto",
          }}
          width={100}
          height={100}
          alt={`Profile picture`}
        />
      </div>
      <div
        style={{
          marginTop: 4,
          display: "flex",
          flexGrow: "column",
          gap: "1rem",
        }}
      >
        <ProfileSidebar></ProfileSidebar>
      </div>
    </div>
  );
}
