"use server";

import { StoreProvider } from "@/app/StoreProvider";
import EditRecipeForm from "./EditRecipeForm";
// import { useUser } from "@auth0/nextjs-auth0";
import * as React from "react";
import { auth } from "@/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // console.log(React.use(params).id)
  const { id } = await params;
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return <h1>You must login to view this page</h1>;
  }
  return (
    <StoreProvider>
      <h1 className="flex w-full justify-center text-lavendar-blush text-4xl pb-2">
        Edit Recipe
      </h1>
      <EditRecipeForm session={session} query={`${id}`} />
    </StoreProvider>
  );
}
