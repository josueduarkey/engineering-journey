import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Locale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Formas de contactar a Josué García.",
};

const copy: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  channels: Array<{
    label: string;
    value: string;
    href: string;
    note: string;
  }>;
}> = {
  es: {
    eyebrow: "Contacto",
    title: "Hablemos.",
    description: "Si tienes una pregunta, propuesta o simplemente quieres conectar, estos son los mejores canales para escribirme.",
    channels: [
      {
        label: "Correo",
        value: "josueduardo.dev@gmail.com",
        href: "mailto:josueduardo.dev@gmail.com",
        note: "Respondo en menos de 24h",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/josueduardev",
        href: "https://linkedin.com/in/josueduardev",
        note: "Para conexiones profesionales",
      },
      {
        label: "GitHub",
        value: "github.com/josueduardev",
        href: "https://github.com/josueduardev",
        note: "Código y proyectos abiertos",
      },
    ],
  },
  en: {
    eyebrow: "Contact",
    title: "Let's talk.",
    description: "If you have a question, proposal, or simply want to connect, these are the best channels to reach me.",
    channels: [
      {
        label: "Email",
        value: "josueduardo.dev@gmail.com",
        href: "mailto:josueduardo.dev@gmail.com",
        note: "I reply within 24h",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/josueduardev",
        href: "https://linkedin.com/in/josueduardev",
        note: "For professional connections",
      },
      {
        label: "GitHub",
        value: "github.com/josueduardev",
        href: "https://github.com/josueduardev",
        note: "Code and open projects",
      },
    ],
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Navigation");
  const c = copy[locale];

  return (
    <div className="mx-auto max-w-[860px] px-6 py-16 md:py-24">
      <SectionHeader
        eyebrow={t("contact")}
        title={c.title}
        description={c.description}
      />

      <div className="mt-16 space-y-4">
        {c.channels.map((ch) => (
          <a
            key={ch.label}
            href={ch.href}
            target={ch.href.startsWith("mailto") ? undefined : "_blank"}
            rel={ch.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="group flex items-center justify-between rounded-sm border border-[var(--border-color)] bg-[var(--bg)] px-6 py-5 transition-colors hover:border-primary/40 hover:bg-primary/[0.02]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                {ch.label}
              </p>
              <p className="mt-1 text-base font-semibold text-neutral-900 dark:text-white">
                {ch.value}
              </p>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                {ch.note}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-neutral-300 transition-colors group-hover:text-primary dark:text-neutral-600"
              aria-hidden
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
