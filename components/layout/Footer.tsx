import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const footerLinks = [
  { key: "journey", href: "/journey" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "curriculum", href: "/curriculum" },
  { key: "achievements", href: "/achievements" },
  { key: "contact", href: "/contact" },
] as const;

export default function Footer() {
  const tNav = useTranslations("Navigation");
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
              Engineering<span className="text-primary">Journey</span>
            </p>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {t("quickLinks")}
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              {footerLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  {tNav(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {t("connect")}
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com/josueduarkey"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <img
                  src="/GitHub_light.svg"
                  alt="GitHub logo"
                  className="h-5 w-5 dark:hidden"
                />
                <img
                  src="/GitHub_dark.svg"
                  alt="GitHub logo"
                  className="hidden h-5 w-5 dark:block"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/josueduardogarcia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <img
                  src="/linkedin.svg"
                  alt="LinkedIn logo"
                  className="h-5 w-5"
                />
              </a>
              <a
                href="mailto:josueduardo.dev@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <img
                  src="/gmail.svg"
                  alt="Gmail logo"
                  className="h-5 w-5"
                />
              </a>
              <a
                href="https://drive.google.com/file/d/1Qik9JP5Z5bBuh-MAgDH5c7aGFzWgDy7Q/preview"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CV"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <img
                  src="/cv.svg"
                  alt="CV logo"
                  className="h-5 w-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 border-t border-[var(--border-color)] pt-6 text-center">
        <p className="text-xs text-neutral-700 dark:text-neutral-500">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
