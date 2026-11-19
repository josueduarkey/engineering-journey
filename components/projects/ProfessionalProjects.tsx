import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import TechnologyChip from "@/components/shared/TechnologyChip";
import ProjectImageStack from "@/components/projects/ProjectImageStack";
import { experiences } from "@/lib/experience";
import type { Locale } from "@/lib/content";

const copy = {
  es: {
    title: "Proyectos profesionales",
    description: "Lo que he desarrollado y en lo que he colaborado dentro de cada empresa, con mi rol, tecnologías y aportes concretos.",
    contribution: "Mi aporte",
    technologies: "Tecnologías utilizadas",
    website: "Visitar sitio de",
  },
  en: {
    title: "Professional projects",
    description: "What I have built and contributed to at each company, including my role, technologies, and specific contributions.",
    contribution: "My contribution",
    technologies: "Technologies used",
    website: "Visit website of",
  },
};

export default function ProfessionalProjects({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <section aria-labelledby="professional-projects-title">
      <SectionHeader id="professional-projects-title" title={c.title} description={c.description} />
      <div className="mt-10 space-y-8">
        {[...experiences].sort((a, b) => b.startDate.localeCompare(a.startDate)).map((experience) => (
          <article key={experience.id} id={experience.id} aria-labelledby={`${experience.id}-company`} className="scroll-mt-24 rounded-2xl border border-(--border-color) bg-(--bg) p-5 sm:p-8">
            <div className="flex items-start gap-4">
              {experience.logo && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Image src={experience.logo} alt="" width={40} height={40} className="h-10 w-10 object-contain p-1" />
                </div>
              )}
              <div>
                <h3 id={`${experience.id}-company`} className="text-lg font-semibold text-neutral-900 dark:text-white">
                  <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.website} ${experience.company}`} className="inline-flex items-center gap-2 rounded hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    {experience.company}<ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-neutral-400" />
                  </a>
                </h3>
                <p className="mt-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{experience.role[locale]} · {experience.period[locale]}</p>
              </div>
            </div>
            <div className="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
              <div className="min-w-0 lg:order-2">
                <h4 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">{experience.projectTitle[locale]}</h4>
                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{experience.projectSummary[locale]}</p>
                {experience.projectReference && (
                  <a href={experience.projectReference.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    {experience.projectReference.label[locale]}
                    <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
                  </a>
                )}
                <ul aria-label={c.technologies} className="mt-5 mb-7 flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => <li key={technology}><TechnologyChip name={technology} /></li>)}
                </ul>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{c.contribution}</p>
                <ul className="space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {experience.highlights[locale].map((highlight) => <li key={highlight} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary" /><span>{highlight}</span></li>)}
                </ul>
              </div>
              <div className="min-w-0 lg:order-1 lg:self-center">
                <ProjectImageStack images={experience.gallery} locale={locale} title={experience.company} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
