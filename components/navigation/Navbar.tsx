"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "about", href: "/about" },
  { key: "journey", href: "/journey" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "curriculum", href: "/curriculum" },
  { key: "achievements", href: "/certifications" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Navigation");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg)]/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6"
        aria-label="Navegación principal"
      >
        {/* ── Left: logo + desktop links ─────────────────────── */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
          >
            <div className="flex items-center gap-0.5 transition-transform duration-200 ease-out hover:scale-105">
              <ChevronLeft size={18} className="-mr-1.5 text-neutral-400 dark:text-neutral-500" />
              <span className="text-lg font-semibold italic text-primary">Josueduar</span>
              <span className="text-lg font-semibold italic text-neutral-900 dark:text-white">dev</span>
              <ChevronRight size={18} className="-ml-0.5 text-neutral-400 dark:text-neutral-500" />
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0 lg:flex">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="nav-sweep-link rounded-md px-3 py-2 text-sm transition-transform duration-150 hover:scale-[1.06]"
              >
                <span className="nav-sweep">{t(key)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right: controls ────────────────────────────────── */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--border-color)] bg-[var(--bg)] px-6 py-3 lg:hidden">
          <div className="flex flex-col gap-0.5">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="nav-sweep-link rounded-md px-3 py-2.5 text-sm"
              >
                <span className="nav-sweep">{t(key)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
