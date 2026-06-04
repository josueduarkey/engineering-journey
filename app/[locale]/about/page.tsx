import type { Metadata } from "next";
import type { Locale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Josué García — Engineering Student & Developer en Key Institute, El Salvador.",
};

const techStack = [
  {
    category: { es: "Frontend", en: "Frontend" },
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML & CSS"],
  },
  {
    category: { es: "Backend", en: "Backend" },
    items: ["Node.js", "Express.js"],
  },
  {
    category: { es: "Herramientas", en: "Tools" },
    items: ["Git", "GitHub"],
  },
];

const currently = [
  {
    institution: { es: "Key Institute", en: "Key Institute" },
    program: {
      es: "Ingeniería en Ciencias de la Computación Integradas",
      en: "Engineering in Integrated Computer Science",
    },
    period: { es: "Ene 2026 – presente", en: "Jan 2026 – present" },
    href: "https://keyinstitute.com/",
  },
  {
    institution: { es: "Universidad Don Bosco", en: "Universidad Don Bosco" },
    program: {
      es: "Técnico en Ingeniería en Computación",
      en: "Technical Degree in Computer Engineering",
    },
    period: { es: "Ene 2024 – Jun 2026", en: "Jan 2024 – Jun 2026" },
    href: "https://www.udb.edu.sv/udb/",
  },
];

const copy: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  bio1: string;
  bio2: string;
  stackTitle: string;
  currentlyTitle: string;
  downloadCV: string;
  photoAlt: string;
}> = {
  es: {
    eyebrow: "Sobre mí",
    title: "Josué García",
    subtitle: "Engineering Student & Developer",
    bio1: "Estudiante de Ingeniería en Ciencias de la Computación Integradas en Key Institute, El Salvador. Aprendo construyendo sistemas reales y documento cada etapa del camino.",
    bio2: "Me motiva la intersección entre tecnología, aprendizaje y comunidad. Creo que documentar el proceso es tan valioso como el resultado.",
    stackTitle: "Stack tecnológico",
    currentlyTitle: "Actualmente",
    downloadCV: "Descargar CV",
    photoAlt: "Foto de Josué García",
  },
  en: {
    eyebrow: "About",
    title: "Josué García",
    subtitle: "Engineering Student & Developer",
    bio1: "Engineering student in Integrated Computer Science at Key Institute, El Salvador. I learn by building real systems and document every step along the way.",
    bio2: "I'm driven by the intersection of technology, learning, and community. I believe documenting the process is as valuable as the outcome.",
    stackTitle: "Tech Stack",
    currentlyTitle: "Currently",
    downloadCV: "Download CV",
    photoAlt: "Photo of Josué García",
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = copy[locale];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">

        {/* Photo column */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          {/* Photo — replace the inner div with <Image src="/about/photo.jpg" fill className="object-cover" alt={c.photoAlt} /> when ready */}
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-(--border-color) bg-primary/5 lg:w-full lg:h-72">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-6xl font-bold text-primary/20 select-none">JG</span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/josueduarkey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-(--border-color) bg-(--bg) transition-colors hover:border-primary/40"
            >
              <img src="/GitHub_light.svg" className="h-4 w-4 dark:hidden" alt="GitHub" />
              <img src="/GitHub_dark.svg" className="hidden h-4 w-4 dark:block" alt="GitHub" />
            </a>

            <a
              href="https://www.linkedin.com/in/josueduardogarcia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-(--border-color) bg-(--bg) transition-colors hover:border-primary/40"
            >
              <img src="/linkedin.svg" className="h-4 w-4" alt="LinkedIn" />
            </a>

            <a
              href="https://drive.google.com/file/d/1Qik9JP5Z5bBuh-MAgDH5c7aGFzWgDy7Q/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-(--border-color) bg-(--bg) px-4 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:border-primary/40 hover:text-primary dark:text-neutral-300"
            >
              {c.downloadCV} ↗
            </a>
          </div>
        </div>

        {/* Info column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {c.eyebrow}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
            {c.subtitle}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            <p>{c.bio1}</p>
            <p>{c.bio2}</p>
          </div>

          {/* Currently studying */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              {c.currentlyTitle}
            </p>
            <div className="space-y-2">
              {currently.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-sm border border-(--border-color) bg-(--bg) px-4 py-3 transition-colors hover:border-primary/40"
                >
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-primary dark:text-white">
                      {item.program[locale]}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      {item.institution[locale]} · {item.period[locale]}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tech Stack ──────────────────────────────────────────────── */}
      <div className="mt-20 border-t border-(--border-color) pt-16">
        <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {c.stackTitle}
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {techStack.map((group) => (
            <div key={group.category.en}>
              <p className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
                {group.category[locale]}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-(--border-color) bg-(--bg) px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
