"use client";

import * as React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function UserMetadata({ children }: { children: any }) {
  const { user, error, isLoading } = useUser();
  React.useEffect(() => {
    // Set user redux stuff here !
  }, [user]);
  return children;
}
