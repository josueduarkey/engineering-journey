"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "about", href: "/about" },
  { key: "journey", href: "/journey" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "achievements", href: "/certifications" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-intro-navigation={pathname === "/about" ? "pending" : undefined}
      className="sticky top-0 z-40 shrink-0 border-b border-(--border-color) bg-(--bg)/95 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]"
        aria-label={t("navigationLabel")}
      >
        {/* Logo */}
        <Link
          href="/about"
          onClick={() => setOpen(false)}
          aria-label={t("homeLabel")}
          className="flex min-h-11 w-fit shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image src="/josueduardev.svg" alt="Josué García — <JE>" width={132} height={48} className="h-8 w-auto" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`nav-sweep-link whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary xl:px-3 ${isActive(href) ? "bg-primary/10 text-primary" : "hover:bg-primary/5"}`}
            >
              <span className={isActive(href) ? undefined : "nav-sweep"}>{t(key)}</span>
            </Link>
          ))}
        </div>

        {/* ── Right: controls ────────────────────────────────── */}
        <div className="flex shrink-0 items-center gap-1 lg:justify-self-end">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={t(open ? "closeMenu" : "openMenu")}
            aria-expanded={open}
            aria-controls={menuId}
            className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <nav
        id={menuId}
        hidden={!open}
        aria-label={t("navigationLabel")}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-(--border-color) bg-(--bg) px-4 py-3 sm:px-6 lg:hidden"
      >
        <div className="flex flex-col gap-0.5">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? "page" : undefined}
              className={`nav-sweep-link rounded-md px-3 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isActive(href) ? "bg-primary/10 text-primary" : "hover:bg-primary/5"}`}
            >
              <span className={isActive(href) ? undefined : "nav-sweep"}>{t(key)}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
