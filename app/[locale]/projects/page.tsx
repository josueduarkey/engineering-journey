import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import TagList from "@/components/shared/TagList";
import { projects, type Locale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects, case studies, and learning evidence from Josue Garcia.",
};

const copy = {
  es: {
    title: "Proyectos documentados como casos de aprendizaje.",
    description:
      "Cada proyecto debe contar el problema, el proceso, las decisiones y las lecciones. Esta primera version crea el indice que despues recibira MDX y casos de estudio completos.",
    featured: "Destacados",
    all: "Todos los proyectos",
    tags: "Vocabulario inicial",
  },
  en: {
    title: "Projects documented as learning case studies.",
    description:
      "Each project should explain the problem, process, decisions, and lessons. This first version creates the index that will later receive MDX and full case studies.",
    featured: "Featured",
    all: "All projects",
    tags: "Initial vocabulary",
  },
} as const;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Navigation");
  const c = copy[locale];
  const featuredProjects = projects.filter((project) => project.featured);
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)));

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader
        eyebrow={t("projects")}
        title={c.title}
        description={c.description}
      />
      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {c.featured}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </section>
      <section className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-sm border border-[var(--border-color)] bg-[var(--bg)] p-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {c.tags}
          </h2>
          <div className="mt-5">
            <TagList tags={allTags} tone="blue" />
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-xl font-semibold text-neutral-900 dark:text-white">
            {c.all}
          </h2>
          <div className="grid gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
