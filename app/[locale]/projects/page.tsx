import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectGroups, getLocaleValue, type Locale } from "@/lib/content";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de ingeniería documentados como casos de aprendizaje de Josué García.",
};

const copy: Record<Locale, {
  title: string;
  description: string;
  comingSoon: string;
  comingSoonSub: string;
}> = {
  es: {
    title: "Proyectos documentados como casos de aprendizaje.",
    description: "Cada proyecto cuenta el problema, el proceso, las decisiones y las lecciones aprendidas.",
    comingSoon: "Próximamente",
    comingSoonSub: "Los proyectos de esta etapa se documentarán a medida que avance la carrera.",
  },
  en: {
    title: "Projects documented as learning case studies.",
    description: "Each project explains the problem, process, decisions, and lessons learned.",
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
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader
        eyebrow={t("projects")}
        title={c.title}
        description={c.description}
      />

      <div className="mt-16 space-y-24">
        {projectGroups.map((group) => {
          const groupProjects = group.slugs
            .map((slug) => allProjects.find((p) => p.slug === slug))
            .filter(Boolean) as typeof allProjects;

          const groupTitle = getLocaleValue(group.title, locale);
          const groupDescription = getLocaleValue(group.description, locale);

          return (
            <section key={group.anchor} id={group.anchor} className="scroll-mt-8">
              <SectionHeader eyebrow={groupTitle} title={groupDescription} />

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
  );
}
