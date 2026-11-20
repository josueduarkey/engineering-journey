import { ViewTransition } from "react";
import LegacyProjectRedirect from "@/components/projects/LegacyProjectRedirect";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import ProfessionalProjects from "@/components/projects/ProfessionalProjects";
import VentureProjects from "@/components/projects/VentureProjects";
import { projectGroups, getLocaleValue, type Locale } from "@/lib/content";
import { getAllProjects } from "@/lib/projects";

const ogImage = `/og?title=Proyectos&description=Casos+de+aprendizaje+documentados%3A+problema%2C+proceso%2C+decisiones+y+lecciones.`;

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de ingeniería documentados como casos de aprendizaje — problema, proceso, decisiones y lecciones aprendidas.",
  openGraph: {
    title: "Proyectos — Josué García",
    description: "Casos de aprendizaje documentados: problema, proceso, decisiones y lecciones.",
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Proyectos — Josué García", images: [ogImage] },
};

const copy: Record<Locale, {
  title: string;
  description: string;
  comingSoon: string;
  comingSoonSub: string;
}> = {
  es: {
    title: "Ideas que ya están en marcha.",
    description: "Productos propios y soluciones empresariales. Explora qué construí, cómo funciona y en qué aporté.",
    comingSoon: "Próximamente",
    comingSoonSub: "Los proyectos de esta etapa se documentarán a medida que avance la carrera.",
  },
  en: {
    title: "Ideas already in motion.",
    description: "Independent products and enterprise solutions. Explore what I built, how it works, and how I contributed.",
    comingSoon: "Coming soon",
    comingSoonSub: "Projects from this stage will be documented as the degree progresses.",
  },
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Navigation");
  const c = copy[locale];
  const allProjects = getAllProjects();

  return (
    <ViewTransition enter="project-enter" exit="project-exit">
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <LegacyProjectRedirect />
      <SectionHeader
        as="h1"
        eyebrow={t("projects")}
        title={c.title}
        description={c.description}
      />

      <div className="mt-16 space-y-24">
        <VentureProjects locale={locale} />
        <ProfessionalProjects locale={locale} />
        {projectGroups.map((group) => {
          const groupProjects = group.slugs
            .map((slug) => allProjects.find((p) => p.slug === slug))
            .filter(Boolean) as typeof allProjects;

          const groupTitle = getLocaleValue(group.title, locale);
          const groupDescription = getLocaleValue(group.description, locale);

          return (
            <section key={group.anchor} id={group.anchor} aria-labelledby={`${group.anchor}-title`} className="scroll-mt-8">
              <SectionHeader id={`${group.anchor}-title`} title={groupTitle} description={groupDescription} />

              {groupProjects.length > 0 ? (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {groupProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} locale={locale} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-sm border border-dashed border-[var(--border-color)] px-8 py-12 text-center">
                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                    {c.comingSoon}
                  </p>
                  <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
                    {c.comingSoonSub}
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
    </ViewTransition>
  );
}
