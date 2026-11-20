import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/content";

export default function ProjectPager({ projects, slug, locale }: {
  projects: { slug: string; title: Record<Locale, string> }[];
  slug: string;
  locale: Locale;
}) {
  const index = projects.findIndex((project) => project.slug === slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const previousLabel = locale === "es" ? "Proyecto anterior" : "Previous project";
  const nextLabel = locale === "es" ? "Siguiente proyecto" : "Next project";
  return (
    <nav aria-label={locale === "es" ? "Navegar entre proyectos" : "Browse projects"} className="project-pager">
      {previous ? (
        <Link href={`/projects/${previous.slug}`} transitionTypes={["project-back"]}>
          <ArrowLeft size={16} aria-hidden="true" /><span><small>{previousLabel}</small>{previous.title[locale]}</span>
        </Link>
      ) : (
        <button type="button" disabled><ArrowLeft size={16} aria-hidden="true" /><span><small>{previousLabel}</small>{locale === "es" ? "Estás en el primero" : "You're at the first project"}</span></button>
      )}
      {next ? (
        <Link href={`/projects/${next.slug}`} transitionTypes={["project-forward"]} className="project-pager-next">
          <span><small>{nextLabel}</small>{next.title[locale]}</span><ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <button type="button" disabled className="project-pager-next"><span><small>{nextLabel}</small>{locale === "es" ? "Estás en el último" : "You're at the last project"}</span><ArrowRight size={16} aria-hidden="true" /></button>
      )}
    </nav>
  );
}
