"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function CVIcon() {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "dark" ? "/cv.png" : "/cv.svg";

  return (
    <Image
      src={src}
      alt="CV logo"
      width={20}
      height={20}
      className="h-5 w-5"
      suppressHydrationWarning
    />
  );
}
