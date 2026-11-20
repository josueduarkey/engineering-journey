import { ViewTransition } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import type { Locale } from "@/lib/content";

export default function PortfolioProjectCard({ project, locale }: { project: PortfolioProject; locale: Locale }) {
  const cover = project.gallery[0];
  return (
    <Link href={`/projects/${project.slug}`} transitionTypes={["project-forward"]} className="catalog-project">
      <ViewTransition name={`project-cover-${project.slug}`} share="project-morph">
        <div className="catalog-project-image">
          {cover ? <Image src={cover.src} alt={cover.alt[locale]} fill sizes="(min-width: 1024px) 390px, (min-width: 640px) 46vw, 90vw" className="object-contain" /> : <span className="catalog-project-placeholder">{project.company ?? project.title[locale]}</span>}
        </div>
      </ViewTransition>
      <p className="editorial-label mt-5">{project.company ?? project.category[locale]}</p>
      <div className="mt-2 flex items-start justify-between gap-4"><h3 className="text-xl font-medium tracking-tight">{project.title[locale]}</h3><ArrowUpRight size={19} className="mt-1 shrink-0 text-primary" /></div>
      <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{project.summary[locale]}</p>
      <span className="mt-5 inline-flex min-h-11 items-center text-xs font-semibold text-primary">{locale === "es" ? "Explorar proyecto" : "Explore project"} ↗</span>
    </Link>
  );
}
