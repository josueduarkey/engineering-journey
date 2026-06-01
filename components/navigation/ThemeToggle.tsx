"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

const themes = [
  { value: "system", Icon: Monitor, label: "Sistema" },
  { value: "light", Icon: Sun, label: "Claro" },
  { value: "dark", Icon: Moon, label: "Oscuro" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current = themes.find((t) => t.value === theme) ?? themes[0];

  const cycle = () => {
    const idx = themes.findIndex((t) => t.value === theme);
    setTheme(themes[(idx + 1) % themes.length].value);
  };

  return (
    <button
      onClick={cycle}
      aria-label={`Tema actual: ${current.label}. Cambiar tema.`}
      suppressHydrationWarning
      className="w-8 h-8 flex items-center justify-center rounded-md text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <current.Icon size={16} />
    </button>
  );
}
