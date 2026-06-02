import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Locale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certificaciones",
  description: "Certificaciones y cursos completados por Josué García.",
};

type Certification = {
  id: string;
  name: Record<Locale, string>;
  issuer: string;
  date: string;
  image: string;
  url?: string;
};

const certifications: Certification[] = [
  // Agrega tus certificaciones aquí:
  // {
  //   id: "ejemplo",
  //   name: { es: "Nombre del curso", en: "Course name" },
  //   issuer: "Plataforma / Institución",
  //   date: "2026-05",
  //   image: "/certifications/nombre.png",
  //   url: "https://...",
  // },
];

const copy: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  empty: string;
  emptySub: string;
}> = {
  es: {
    eyebrow: "Certificaciones",
    title: "Cursos y certificaciones completados.",
    description: "Aprendizaje continuo fuera del aula — plataformas, cursos especializados y formación técnica complementaria.",
    empty: "Próximamente",
    emptySub: "Las certificaciones completadas aparecerán aquí.",
  },
  en: {
    eyebrow: "Certifications",
    title: "Completed courses and certifications.",
    description: "Continuous learning outside the classroom — platforms, specialized courses, and complementary technical training.",
    empty: "Coming soon",
    emptySub: "Completed certifications will appear here.",
  },
};

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Navigation");
  const c = copy[locale];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader
        eyebrow={t("achievements")}
        title={c.title}
        description={c.description}
      />

      <div className="mt-16">
        {certifications.length === 0 ? (
          <div className="rounded-sm border border-dashed border-[var(--border-color)] px-8 py-16 text-center">
            <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
              {c.empty}
            </p>
            <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
              {c.emptySub}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {certifications.map((cert) => {
              const name = cert.name[locale];
              const card = (
                <div className="group flex flex-col overflow-hidden rounded-sm border border-[var(--border-color)] bg-[var(--bg)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={cert.image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold leading-snug text-neutral-900 dark:text-white">
                      {name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      {cert.issuer}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                      {cert.date}
                    </p>
                  </div>
                </div>
              );

              return cert.url ? (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  {card}
                </a>
              ) : (
                <div key={cert.id}>{card}</div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
