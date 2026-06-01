import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import TagList from "@/components/shared/TagList";
import {
  getLocaleValue,
  getProject,
  powerSkillLabels,
  projects,
  type Locale,
} from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

const copy = {
  es: {
    back: "Volver a proyectos",
    problem: "Problema",
    process: "Proceso",
    outcomes: "Resultados",
    lessons: "Lecciones aprendidas",
    technologies: "Tecnologias",
    powerSkills: "Power Skills",
    repository: "Repositorio",
    demo: "Demo",
  },
  en: {
    back: "Back to projects",
    problem: "Problem",
    process: "Process",
    outcomes: "Outcomes",
    lessons: "Lessons learned",
    technologies: "Technologies",
    powerSkills: "Power Skills",
    repository: "Repository",
    demo: "Demo",
  },
} as const;

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { locale: "es", slug: project.slug },
    { locale: "en", slug: project.slug },
  ]);
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  return {
    title: getLocaleValue(project.title, locale),
    description: getLocaleValue(project.summary, locale),
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const c = copy[locale];
  const title = getLocaleValue(project.title, locale);

  return (
    <article className="mx-auto max-w-[1100px] px-6 py-16 md:py-24">
      <Link
        href="/projects"
        className="text-sm font-semibold text-primary transition-opacity hover:opacity-80"
      >
        {c.back}
      </Link>
      <header className="mt-8 border-b border-[var(--border-color)] pb-10">
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-neutral-800 dark:text-secondary">
            {getLocaleValue(project.status, locale)}
          </span>
          <span className="rounded-full border border-[var(--border-color)] bg-[var(--bg)] px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            {getLocaleValue(project.stage, locale)}
          </span>
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          {getLocaleValue(project.summary, locale)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.repository ? (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              {c.repository}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-color)] bg-[var(--bg)] px-4 py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100"
            >
              {c.demo}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </header>

      <div className="grid gap-10 py-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              {c.problem}
            </h2>
            <p className="mt-4 text-base leading-8 text-neutral-600 dark:text-neutral-400">
              {getLocaleValue(project.problem, locale)}
            </p>
          </section>
          <ProjectListSection title={c.process} items={getLocaleValue(project.process, locale)} />
          <ProjectListSection
            title={c.outcomes}
            items={getLocaleValue(project.outcomes, locale)}
          />
          <ProjectListSection
            title={c.lessons}
            items={getLocaleValue(project.lessons, locale)}
          />
        </div>
        <aside className="h-fit space-y-6 rounded-sm border border-[var(--border-color)] bg-[var(--bg)] p-6 lg:sticky lg:top-8">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
              {c.technologies}
            </h2>
            <TagList tags={project.technologies} />
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
              {c.powerSkills}
            </h2>
            <TagList
              tags={project.powerSkills.map((skill) =>
                getLocaleValue(powerSkillLabels[skill], locale)
              )}
              tone="green"
            />
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
              Tags
            </h2>
            <TagList tags={project.tags} tone="blue" />
          </div>
        </aside>
      </div>
    </article>
  );
}

function ProjectListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="border-l-2 border-secondary pl-4 text-base leading-8 text-neutral-600 dark:text-neutral-400"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
