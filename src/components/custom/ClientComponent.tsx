// app/components/custom/ClientComponent.tsx

"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientComponent() {
  const pathname = usePathname();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("pathname", pathname); // Update query with pathname
    window.history.pushState({}, "", url); // Push updated URL to the browser history
  }, [pathname]);

  return <div></div>;
}
