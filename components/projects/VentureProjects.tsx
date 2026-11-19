import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import TechnologyChip from "@/components/shared/TechnologyChip";
import ProjectImageStack from "@/components/projects/ProjectImageStack";
import { ventures } from "@/lib/ventures";
import type { Locale } from "@/lib/content";

const copy = {
  es: {
    title: "Emprendimientos",
    description: "Productos que estoy construyendo para resolver necesidades reales en educación, turismo y finanzas personales.",
    technologies: "Tecnologías utilizadas",
    development: "Lo que he desarrollado",
    visit: "Visitar",
    navigation: "Explorar emprendimientos",
  },
  en: {
    title: "Ventures",
    description: "Products I am building to address real needs in education, tourism, and personal finance.",
    technologies: "Technologies used",
    development: "What I have built",
    visit: "Visit",
    navigation: "Explore ventures",
  },
};

export default function VentureProjects({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <section id="emprendimientos" aria-labelledby="ventures-title" className="scroll-mt-24">
      <SectionHeader id="ventures-title" title={c.title} description={c.description} />
      <nav aria-label={c.navigation} className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
        {ventures.map((venture) => (
          <a key={venture.id} href={`#${venture.id}`} className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {venture.name}<span aria-hidden="true">↓</span>
          </a>
        ))}
      </nav>
      <div className="mt-7 space-y-8">
        {ventures.map((venture) => (
          <article key={venture.id} id={venture.id} aria-labelledby={`${venture.id}-title`} className="scroll-mt-24 rounded-2xl border border-(--border-color) bg-(--bg) p-5 sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
              <div className="min-w-0 lg:order-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{venture.category[locale]}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                    <Image src={venture.logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                  </div>
                  <h3 id={`${venture.id}-title`} className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">{venture.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{venture.description[locale]}</p>
                <ul aria-label={c.technologies} className="mt-5 flex flex-wrap gap-2">
                  {venture.technologies.map((technology) => <li key={technology}><TechnologyChip name={technology} /></li>)}
                </ul>
                <p className="mt-7 mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{c.development}</p>
                <ul className="space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {venture.highlights[locale].map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <a href={venture.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  {c.visit} {venture.name}<ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="min-w-0 lg:order-1">
                <ProjectImageStack images={venture.gallery} locale={locale} title={venture.name} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
