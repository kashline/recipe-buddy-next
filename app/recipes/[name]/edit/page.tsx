"use client";

import { StoreProvider } from "@/app/StoreProvider";
import EditRecipeForm from "./EditRecipeForm";

export default function Page({ params }: { params: any }) {
  return (
    <StoreProvider>
      <EditRecipeForm query={`${params!.name}`} />
    </StoreProvider>
  );
}
