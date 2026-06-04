"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  UserRound,
  Road,
  BriefcaseBusiness,
  Newspaper,
  Trophy,
  Contact,
  type LucideIcon,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks: Array<{ key: string; href: string; Icon: LucideIcon }> = [
  { key: "about",        href: "/about",          Icon: UserRound       },
  { key: "journey",      href: "/journey",         Icon: Road            },
  { key: "projects",     href: "/projects",        Icon: BriefcaseBusiness },
  { key: "blog",         href: "/blog",            Icon: Newspaper       },
  { key: "achievements", href: "/certifications",  Icon: Trophy          },
  { key: "contact",      href: "/contact",         Icon: Contact         },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ collapsed, onClick }: { collapsed: boolean; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Inicio">
      {collapsed ? (
        /* Collapsed: personal SVG icon */
        <div className="flex items-center justify-center transition-transform duration-200 hover:scale-110">
          <Image
            src="/josueduardev.svg"
            alt="JosuEduarDev"
            width={64}
            height={64}
            className="object-contain"
            style={{ width: 64}}
            priority
          />
        </div>
      ) : (
        /* Expanded: original text logo */
        <div className="flex w-fit items-center gap-0.5 transition-transform duration-200 hover:scale-[1.10]">
          <ChevronLeft size={16} className="-mr-1 text-neutral-400 dark:text-neutral-500" />
          <span className="text-base font-semibold italic text-primary">Josueduar</span>
          <span className="text-base font-semibold italic text-neutral-900 dark:text-white">dev</span>
          <ChevronRight size={16} className="-ml-0.5 text-neutral-400 dark:text-neutral-500" />
        </div>
      )}
    </Link>
  );
}

// ─── Nav content ──────────────────────────────────────────────────────────────

function NavContent({
  collapsed,
  onClose,
  onToggleCollapse,
  showCollapseButton,
}: {
  collapsed: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
  showCollapseButton?: boolean;
}) {
  const t = useTranslations("Navigation");

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Logo */}
      <div className={`flex shrink-0 items-center justify-center border-b border-[var(--border-color)] ${collapsed ? "px-0 py-5" : "px-5 py-6"}`}>
        <Logo collapsed={collapsed} onClick={onClose} />
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-x-hidden overflow-y-auto py-3" aria-label="Navegación principal">
        <div className="flex flex-col gap-0.5 px-2">
          {navLinks.map(({ key, href, Icon }) => (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              className={`group relative flex items-center rounded-md transition-all duration-150 ${
                collapsed
                  ? "justify-center px-0 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  : "nav-sweep-link gap-2.5 px-3 py-2 hover:scale-[1.04] origin-left"
              }`}
            >
              <Icon
                size={17}
                className={collapsed ? "text-neutral-500 transition-colors group-hover:text-primary dark:text-neutral-400" : "nav-sweep-icon shrink-0"}
              />

              {/* Expanded: animated label */}
              {!collapsed && (
                <span className="nav-sweep text-[17px] font-semibold">
                  {t(key)}
                </span>
              )}

              {/* Collapsed: tooltip to the right */}
              {collapsed && (
                <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:bg-white dark:text-neutral-900">
                  {t(key)}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom controls */}
      <div className={`shrink-0 border-t border-[var(--border-color)] ${collapsed ? "flex flex-col items-center gap-2 py-4" : "flex items-center gap-2 px-5 py-4"}`}>
        {!collapsed && <LanguageSwitcher />}
        <ThemeToggle />
        {showCollapseButton && (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            {collapsed ? <ArrowRightFromLine size={16} /> : <ArrowLeftFromLine size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* ── Mobile top bar ───────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg)]/90 px-4 backdrop-blur-md lg:hidden">
        <Logo collapsed={false} />
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

      {/* ── Mobile sidebar overlay ───────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setOpen(false)}>
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
            <NavContent
              collapsed={false}
              onClose={() => setOpen(false)}
              showCollapseButton={false}
            />
          </aside>
        </div>
      )}

      {/* ── Desktop sidebar ──────────────────────────────────────── */}
      <aside
        className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-[var(--border-color)] bg-[var(--bg)] transition-[width] duration-200 ease-in-out lg:flex"
        style={{ width: collapsed ? 60 : 224 }}
      >
        <NavContent
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          showCollapseButton
        />
      </aside>
    </>
  );
}
