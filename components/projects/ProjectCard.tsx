import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocaleValue, powerSkillLabels, type Locale } from "@/lib/content";
import type { ProjectMeta } from "@/lib/projects";
import TagList from "@/components/shared/TagList";

type ProjectCardProps = {
  project: ProjectMeta;
  locale: Locale;
};

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = getLocaleValue(project.title, locale);
  const summary = getLocaleValue(project.summary, locale);
  const status = getLocaleValue(project.status, locale);

  return (
    <article className="group flex h-full flex-col rounded-sm border border-[var(--border-color)] bg-[var(--bg)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors hover:border-primary/40">
      <div className="border-b border-[var(--border-color)] p-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-neutral-800 dark:text-secondary">
            {status}
          </span>
          <ArrowUpRight
            size={18}
            className="text-neutral-400 transition-colors group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
          <Link href={`/projects/${project.slug}`}>{title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          {summary}
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-5">
        <TagList tags={project.tags} />
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
            Power Skills
          </p>
          <TagList
            tags={project.powerSkills.map((skill) =>
              getLocaleValue(powerSkillLabels[skill], locale)
            )}
            tone="green"
          />
        </div>
      </div>
    </article>
  );
}
