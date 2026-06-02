"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Road,
  BriefcaseBusiness,
  Newspaper,
  FileUser,
  Calendar1,
  Trophy,
  Contact,
  type LucideIcon,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks: Array<{
  key: string;
  href: string;
  Icon: LucideIcon;
}> = [
  { key: "journey", href: "/journey", Icon: Road },
  { key: "projects", href: "/projects", Icon: BriefcaseBusiness },
  { key: "blog", href: "/blog", Icon: Newspaper },
  { key: "curriculum", href: "/curriculum", Icon: FileUser },
  { key: "keyWeek", href: "/key-week", Icon: Calendar1 },
  { key: "achievements", href: "/certifications", Icon: Trophy },
  { key: "contact", href: "/contact", Icon: Contact },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick}>
      <div className="flex w-fit items-center gap-0.5 transition-transform duration-200 hover:scale-[1.10]">
        <ChevronLeft size={16} className="-mr-1 text-neutral-400 dark:text-neutral-500" />
        <span className="text-base font-semibold italic text-primary">Josueduar</span>
        <span className="text-base font-semibold italic text-neutral-900 dark:text-white">dev</span>
        <ChevronRight size={16} className="-ml-0.5 text-neutral-400 dark:text-neutral-500" />
      </div>
    </Link>
  );
}

function NavContent({ onClose }: { onClose?: () => void }) {
  const t = useTranslations("Navigation");

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="px-5 pb-6 pt-8">
        <Logo onClick={onClose} />
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto px-3" aria-label="Navegación principal">
        <div className="flex flex-col gap-0.5">
          {navLinks.map(({ key, href, Icon }) => (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              className="nav-sweep-link flex origin-left items-center gap-2.5 rounded-md px-3 py-2 transition-transform duration-150 hover:scale-[1.04]"
            >
              <Icon size={17} className="nav-sweep-icon" />
              <span className="nav-sweep text-[17px] font-semibold">{t(key)}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom controls */}
      <div className="flex items-center gap-2 border-t border-[var(--border-color)] px-5 py-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top bar (hidden on desktop) ──────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg)]/90 px-4 backdrop-blur-md lg:hidden">
        <Logo />
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* ── Mobile sidebar overlay ───────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 flex h-full w-56 flex-col border-r border-[var(--border-color)] bg-[var(--bg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end px-4 pt-4">
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <X size={18} />
              </button>
            </div>
            <NavContent onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Desktop sidebar (hidden on mobile) ──────────────── */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-[var(--border-color)] bg-[var(--bg)] lg:flex">
        <NavContent />
      </aside>
    </>
  );
}
