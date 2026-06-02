"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function CVIcon() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const src = mounted && resolvedTheme === "dark" ? "/cv.png" : "/cv.svg";

  return (
    <Image
      src={src}
      alt="CV logo"
      width={20}
      height={20}
      className="h-5 w-5"
    />
  );
}
