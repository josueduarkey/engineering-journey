import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import TagList from "@/components/shared/TagList";
import { getLocaleValue, powerSkillLabels, type Locale } from "@/lib/content";
import { getAllProjects, getProjectMeta } from "@/lib/projects";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectMeta(slug);
  if (!project) return {};
  const title = getLocaleValue(project.title, locale);
  const description = getLocaleValue(project.summary, locale);
  const ogImage = `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, images: [ogImage] },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  const locales: Locale[] = ["es", "en"];
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export const dynamicParams = false;

const copy: Record<Locale, {
  back: string;
  technologies: string;
  powerSkills: string;
  repository: string;
  demo: string;
}> = {
  es: {
    back: "Volver a proyectos",
    technologies: "Tecnologías",
    powerSkills: "Power Skills",
    repository: "Repositorio",
    demo: "Demo",
  },
  en: {
    back: "Back to projects",
    technologies: "Technologies",
    powerSkills: "Power Skills",
    repository: "Repository",
    demo: "Demo",
  },
};

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectMeta(slug);
  if (!project) notFound();

  const { default: Content } = await import(`@/content/projects/${slug}.mdx`);
  const c = copy[locale];
  const title = getLocaleValue(project.title, locale);
  const summary = getLocaleValue(project.summary, locale);
  const status = getLocaleValue(project.status, locale);
  const stage = getLocaleValue(project.stage, locale);

  return (
    <article className="mx-auto max-w-275 px-6 py-16 md:py-24">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary dark:text-neutral-400"
      >
        <ArrowLeft size={14} />
        {c.back}
      </Link>

      {/* Header */}
      <header className="mt-8 border-b border-(--border-color) pb-10">
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-neutral-800 dark:text-secondary">
            {status}
          </span>
          <span className="rounded-full border border-(--border-color) bg-(--bg) px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            {stage}
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          {summary}
        </p>

        {(project.repository || project.demo) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {c.repository}
                <ExternalLink size={14} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-(--border-color) bg-(--bg) px-4 py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100 transition-colors hover:border-primary/40"
              >
                {c.demo}
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </header>

      {/* Body: MDX content + sidebar */}
      <div className="grid gap-12 py-12 lg:grid-cols-[1fr_260px]">
        {/* MDX prose */}
        <div className="prose prose-neutral dark:prose-invert max-w-none
          prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
          prose-li:border-l-2 prose-li:border-secondary prose-li:pl-4 prose-li:my-1
          prose-li:marker:hidden [&_ul]:list-none [&_ul]:pl-0">
          <Content />
        </div>

        {/* Sticky sidebar */}
        <aside className="h-fit space-y-6 rounded-sm border border-(--border-color) bg-(--bg) p-6 lg:sticky lg:top-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
              {c.technologies}
            </p>
            <TagList tags={project.technologies} />
          </div>

          {project.powerSkills.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                {c.powerSkills}
              </p>
              <TagList
                tags={project.powerSkills.map((skill) =>
                  getLocaleValue(powerSkillLabels[skill], locale)
                )}
                tone="green"
              />
            </div>
          )}

          {project.tags.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                Tags
              </p>
              <TagList tags={project.tags} tone="blue" />
            </div>
          )}
        </aside>
      </div>

      {/* Footer back */}
      <div className="border-t border-(--border-color) pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary dark:text-neutral-400"
        >
          <ArrowLeft size={14} />
          {c.back}
        </Link>
      </div>
    </article>
  );
}
