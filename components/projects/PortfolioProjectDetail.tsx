import { ViewTransition } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import TechnologyChip from "@/components/shared/TechnologyChip";
import ProjectPager from "./ProjectPager";
import ProjectImageSlider from "./ProjectImageSlider";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import type { Locale } from "@/lib/content";

export default function PortfolioProjectDetail({ project, projects, locale }: {
  project: PortfolioProject;
  projects: { slug: string; title: Record<Locale, string> }[];
  locale: Locale;
}) {
  const es = locale === "es";
  return (
    <ViewTransition enter="project-enter" exit="project-exit">
      <article className="mx-auto max-w-[1152px] px-6 pb-12 pt-6 md:pb-20 md:pt-8">
        <Link href="/projects" transitionTypes={["project-back"]} className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-500"><ArrowLeft size={16} />{es ? "Todos los proyectos" : "All projects"}</Link>
        {project.gallery.length > 0 && <div className="mt-6"><ProjectImageSlider key={project.slug} images={project.gallery} locale={locale} slug={project.slug} title={project.title[locale]} /></div>}
        <header className="mb-10 mt-8">
          <p className="editorial-label">{project.category[locale]}{project.company ? ` / ${project.company}` : ""}</p>
          <div className="project-title-row">
            <h1 className="min-w-0 max-w-4xl text-4xl font-medium tracking-[-0.045em] md:text-6xl">{project.title[locale]}</h1>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-site-link" title={new URL(project.url).hostname.replace(/^www\./, "")}>
              <span>{project.linkLabel[locale]}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">{project.summary[locale]}</p>
          {project.role && <p className="mt-4 text-sm text-neutral-500">{project.role[locale]} · {project.period?.[locale]}</p>}
        </header>
        <section className="mb-10 border-t border-(--border-color) pt-8" aria-labelledby="project-contribution-title">
          <h2 id="project-contribution-title" className="text-2xl font-medium tracking-tight">{es ? "Lo que desarrollé y aporté" : "What I built and contributed"}</h2>
          <section className="mt-6" aria-labelledby="project-technologies-title">
            <h3 id="project-technologies-title" className="editorial-label">{es ? "Tecnologías" : "Technologies"}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">{project.technologies.map((technology) => <li key={technology}><TechnologyChip name={technology} /></li>)}</ul>
          </section>
          <ul className="mt-6 max-w-4xl space-y-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{project.highlights[locale].map((highlight) => <li key={highlight} className="flex gap-4"><span aria-hidden="true" className="text-primary">↗</span><span>{highlight}</span></li>)}</ul>
        </section>
        <ProjectPager projects={projects} slug={project.slug} locale={locale} />
      </article>
    </ViewTransition>
  );
}
