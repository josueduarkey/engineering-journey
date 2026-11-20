"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import TechnologyChip from "@/components/shared/TechnologyChip";
import { experiences } from "@/lib/experience";
import type { Locale } from "@/lib/content";
import TimelineScrollIndicator from "./TimelineScrollIndicator";

const copy = {
  es: {
    latest: "Más reciente",
    current: "Actual",
    show: "Ver responsabilidades",
    hide: "Ocultar responsabilidades",
    work: "Aportes y resultados",
    technologies: "Tecnologías utilizadas",
    website: "Visitar sitio de",
    projects: "Ver proyectos y mi aporte",
    projectsAt: "Ver proyectos y mi aporte en",
  },
  en: {
    latest: "Most recent",
    current: "Current",
    show: "View responsibilities",
    hide: "Hide responsibilities",
    work: "Contributions and results",
    technologies: "Technologies used",
    website: "Visit website of",
    projects: "View projects and my contribution",
    projectsAt: "View projects and my contribution at",
  },
};

const sortedExperiences = [...experiences].sort((a, b) =>
  b.startDate.localeCompare(a.startDate)
);

export default function ExperienceTimeline({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<string | null>(sortedExperiences[0]?.id ?? null);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 20%", "end 80%"],
    trackContentSize: true,
  });
  const c = copy[locale];
  const transition = { duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div ref={timelineRef} className="relative mx-auto grid max-w-5xl grid-cols-[2rem_minmax(0,1fr)] gap-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6">
      <div className="relative before:absolute before:inset-y-4 before:left-1/2 before:w-px before:bg-(--border-color)">
        <TimelineScrollIndicator progress={scrollYProgress} reducedMotion={!!reducedMotion} locale={locale} />
      </div>
      <ol className="space-y-8 sm:space-y-10">
      {sortedExperiences.map((experience, index) => {
        const isOpen = activeId === experience.id;
        const panelId = `${id}-${experience.id}-panel`;
        const buttonId = `${id}-${experience.id}-toggle`;

        return (
          <li key={experience.id}>
            <article className="min-w-0 rounded-2xl border border-(--border-color) bg-(--bg) p-4 sm:p-6">
              <p aria-hidden="true" className="mb-4 font-mono text-[10px] tracking-widest text-neutral-400">{String(index + 1).padStart(2, "0")} / {experience.startDate.slice(0, 4)}</p>
              <div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg sm:h-14 sm:w-14 ${experience.logo ? "bg-white" : "bg-(--surface)"}`}>
                    {experience.logo ? (
                      <Image src={experience.logo} alt="" width={40} height={40} className="h-10 w-10 object-contain p-1" />
                    ) : (
                      <span aria-hidden="true" className="font-mono text-base font-semibold tracking-tight text-primary">{experience.initials}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.website} ${experience.company}`} className="group/company inline-flex max-w-full items-center gap-1.5 rounded text-sm font-semibold text-neutral-900 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-white dark:hover:text-primary">
                      <span>{experience.company}</span>
                      <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 text-neutral-400 transition-transform group-hover/company:-translate-y-0.5 group-hover/company:translate-x-0.5" />
                    </a>
                    <p className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">{experience.period[locale]}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"><MapPin size={12} aria-hidden="true" />{experience.location}</p>
                    {(experience.employmentType || experience.workMode) && (
                      <p className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                        {[experience.employmentType?.[locale], experience.workMode?.[locale]].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {index === 0 && (
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-secondary">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                        {experience.current ? c.current : c.latest}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-5">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActiveId(isOpen ? null : experience.id)}
                    className="group/toggle flex w-full items-center justify-between gap-3 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span>
                      <span className="block text-lg font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-xl">{experience.role[locale]}</span>
                      <span aria-hidden="true" className="mt-1.5 block text-xs font-medium text-primary">{isOpen ? c.hide : c.show}</span>
                    </span>
                    <motion.span aria-hidden="true" initial={false} animate={{ rotate: isOpen ? 180 : 0 }} transition={transition} className={`flex h-11 w-11 shrink-0 items-center justify-center transition-colors group-hover/toggle:text-primary ${isOpen ? "text-primary" : "text-neutral-400"}`}>
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>
                </h3>

                <ul aria-label={c.technologies} className="mt-5 flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <li key={technology}>
                      <TechnologyChip name={technology} />
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={transition}
                className="overflow-hidden"
              >
                <div className="pt-7">
                  <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">{c.work}</h4>
                  <ul className="max-w-4xl space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                    {experience.highlights[locale].map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5">
                        <ChevronRight size={14} aria-hidden="true" className="mt-1.5 shrink-0 text-primary/70" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <div className="pt-6">
                <Link
                  href={`/projects/${experience.id}`}
                  transitionTypes={["project-forward"]}
                  aria-label={`${c.projectsAt} ${experience.company}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {c.projects}
                  <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
                </Link>
              </div>
            </article>
          </li>
        );
      })}
      </ol>
    </div>
  );
}
