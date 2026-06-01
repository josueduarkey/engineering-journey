"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        onClick={() => switchLocale("es")}
        disabled={isPending}
        aria-label="Cambiar a Español"
        className={`px-2 py-1 rounded transition-colors ${
          locale === "es"
            ? "text-primary font-semibold"
            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        }`}
      >
        ES
      </button>
      <span className="text-neutral-300 dark:text-neutral-700 select-none">|</span>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        aria-label="Switch to English"
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "text-primary font-semibold"
            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
