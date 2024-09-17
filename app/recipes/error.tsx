"use client";

import Button from "@/app/ui/button";
import { useEffect } from "react";
import "./[name]/styles.css";
import { useRouter, usePathname } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="error">
      <h2 className="py-6">
        <strong style={{ color: "white" }}>
          There was an error loading recipes!
        </strong>
      </h2>
      <h2 className="py-6">Please try again</h2>
      <Button
        onClick={() => {
          router.replace(pathName);
        }}
      >
        Try again
      </Button>
    </div>
  );
}
