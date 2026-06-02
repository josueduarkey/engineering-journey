"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("app_loaded")) {
      setIsLoading(false);
      return;
    }
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem("app_loaded", "1");
      setIsLoading(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#eaf4ff]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <Image
        src="/josueduardev.svg"
        alt="JosuEduarDev"
        width={260}
        height={70}
        priority
        className="loader-logo h-auto w-64 max-w-[80vw]"
      />
    </div>
  );
}
