"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const themes = [
  { value: "light", Icon: Sun, label: "Claro" },
  { value: "dark", Icon: Moon, label: "Oscuro" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = themes.find((t) => t.value === theme) ?? themes[0];

  const cycle = () => {
    const idx = themes.findIndex((t) => t.value === theme);
    setTheme(themes[(idx + 1) % themes.length].value);
  };

  return (
    <button
      onClick={cycle}
      aria-label={mounted ? `Tema actual: ${current.label}. Cambiar tema.` : "Cambiar tema"}
      className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
    >
      {mounted ? <current.Icon size={16} /> : <span className="block h-4 w-4" />}
    </button>
  );
}
