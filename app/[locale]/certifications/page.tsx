import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Locale } from "@/lib/content";
import { formatDate, buildHref } from "@/lib/helper";
import type { Certification, Category } from "@/types/certification";

export const metadata: Metadata = {
  title: "Certificaciones",
  description: "Certificaciones y cursos completados por Josué García.",
};

const certifications: Certification[] = [
  {
    id: "PLATZI-01",
    name: { es: "Curso para Líderes en Formación", en: "Course for Leaders in Training" },
    issuer: "Platzi - Escuela de Habilidades Blandas",
    date: "2026-05",
    image: "/achievements/liderazgo-platzi.png",
    url: "https://platzi.com/p/eduardo.garcia2271/curso/1286-course/diploma/detalle/",
    category: "soft-skills",
  },
  {
    id: "PLATZI-02",
    name: { es: "Curso de Backend con Express JS", en: "Backend Course with Express JS" },
    issuer: "Platzi - Escuela de Desarrollo Web",
    date: "2025-12",
    image: "/achievements/expressjs.png",
    url: "https://platzi.com/p/ge240098/curso/11971-course/diploma/detalle/",
    category: "dev",
  },
  {
    id: "CREO-01",
    name: { es: "Taller de Promueve tu País", en: "Workshop: Promote Your Country" },
    issuer: "FUSADES - Promueve tu País",
    date: "2024-08",
    image: "/achievements/taller-creo.png",
    url: "https://drive.google.com/file/d/1pP4cZAseREH-_8LpeesGHv9L2j2l9lUI/preview",
    category: "talleres",
  },
  {
    id: "OPOR-01",
    name: { es: "Certificado de Workeys", en: "Certificate of Training in Employability" },
    issuer: "Programa Oportunidades - Fase 3",
    date: "2025-02",
    image: "/achievements/workeys.png",
    url: "https://drive.google.com/file/d/12LzAdwr7PaS3wLMrjdikDjvxX7zYfdWB/preview",
    category: "talleres",
  },
  {
    id: "OPOR-02",
    name: { es: "Diploma de Participación de mentorías", en: "Diploma of Participation in Mentoring" },
    issuer: "PBS x FGK",
    date: "2025-10",
    image: "/achievements/pbs-mentoring.png",
    url: "https://drive.google.com/file/d/1m1CUXyC33pX0kUWpJhM__YOYAmmJINiw/preview",
    category: "talleres",
  },
  {
    id: "PLATZI-03",
    name: { es: "Curso de Ingeniería de Software", en: "Software Engineering Course" },
    issuer: "Platzi - Escuela de Ingeniería de Software",
    date: "2025-08",
    image: "/achievements/fundamentos-software.png",
    url: "https://platzi.com/p/ge240098/curso/11997-course/diploma/detalle/",
    category: "dev",
  },
  {
    id: "PLATZI-04",
    name: { es: "Curso de Prompt Engineering", en: "Prompt Engineering Course" },
    issuer: "Platzi - Escuela de Inteligencia Artificial",
    date: "2025-10",
    image: "/achievements/prompt-eng.png",
    url: "https://platzi.com/p/ge240098/curso/12323-course/diploma/detalle/",
    category: "ai",
  },
  {
    id: "KEY-01",
    name: { es: "Programa DALE", en: "DALE Program" },
    issuer: "Key Institute x Fundación FORJA",
    date: "2026-05",
    image: "/achievements/dale.png",
    url: "https://drive.google.com/file/d/1v-j5LYBwXm3KKThZwaEmQGsr6wbMotX4/preview",
    category: "talleres",
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

const categories: { id: Category | "all"; label: Record<Locale, string> }[] = [
  { id: "all", label: { es: "Todos", en: "All" } },
  { id: "dev", label: { es: "Desarrollador", en: "Developer" } },
  { id: "ai", label: { es: "AI", en: "AI" } },
  { id: "soft-skills", label: { es: "Soft Skills", en: "Soft Skills" } },
  { id: "talleres", label: { es: "Talleres", en: "Workshops" } },
];


const copy: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  empty: string;
  emptySub: string;
  prev: string;
  next: string;
  pageOf: string;
}> = {
  es: {
    eyebrow: "Certificaciones",
    title: "Cursos y certificaciones completados.",
    description: "Aprendizaje continuo fuera del aula — plataformas, cursos especializados y formación técnica complementaria.",
    empty: "Próximamente",
    emptySub: "Las certificaciones de esta categoría aparecerán aquí.",
    prev: "Anterior",
    next: "Siguiente",
    pageOf: "de",
  },
  en: {
    eyebrow: "Certifications",
    title: "Completed courses and certifications.",
    description: "Continuous learning outside the classroom — platforms, specialized courses, and complementary technical training.",
    empty: "Coming soon",
    emptySub: "Certifications for this category will appear here.",
    prev: "Previous",
    next: "Next",
    pageOf: "of",
  },
};

const PAGE_SIZE = 12;


export default async function CertificationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { locale } = await params;
  const { category: rawCategory, page: rawPage } = await searchParams;

  const t = await getTranslations("Navigation");
  const c = copy[locale];

  const activeCategory = rawCategory && rawCategory !== "all" ? rawCategory : "all";
  const currentPage = Math.max(1, parseInt(rawPage ?? "1", 10));

  // Filter by category
  const filtered =
    activeCategory === "all"
      ? certifications
      : certifications.filter((cert) => cert.category === activeCategory);

  // Sort newest → oldest by YYYY-MM string comparison
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader
        eyebrow={t("achievements")}
        title={c.title}
        description={c.description}
      />

      {/* ── Category filters ─────────────────────────────────────────────── */}
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <Link
              key={cat.id}
              href={buildHref(cat.id === "all" ? undefined : cat.id)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-(--border-color) bg-(--bg) text-neutral-600 hover:border-primary/40 hover:text-primary dark:text-neutral-400",
              ].join(" ")}
            >
              {cat.label[locale]}
            </Link>
          );
        })}
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <div className="mt-10">
        {paged.length === 0 ? (
          <div className="rounded-sm border border-dashed border-(--border-color) px-8 py-16 text-center">
            <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
              {c.empty}
            </p>
            <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
              {c.emptySub}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paged.map((cert) => {
              const name = cert.name[locale];
              const card = (
                <div className="group flex flex-col overflow-hidden rounded-sm border border-(--border-color) bg-(--bg) transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={cert.image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold leading-snug text-neutral-900 dark:text-white">
                      {name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      {cert.issuer}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                      {formatDate(cert.date, locale)}
                    </p>
                  </div>
                </div>
              );

              return cert.url ? (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  {card}
                </a>
              ) : (
                <div key={cert.id}>{card}</div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Pagination ───────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          {safePage > 1 ? (
            <Link
              href={buildHref(activeCategory === "all" ? undefined : activeCategory, safePage - 1)}
              className="rounded-sm border border-(--border-color) bg-(--bg) px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary/40 dark:text-neutral-300"
            >
              ← {c.prev}
            </Link>
          ) : (
            <span className="cursor-default rounded-sm border border-(--border-color) px-4 py-2 text-sm font-medium text-neutral-300 dark:text-neutral-600">
              ← {c.prev}
            </span>
          )}

          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {safePage} {c.pageOf} {totalPages}
          </span>

          {safePage < totalPages ? (
            <Link
              href={buildHref(activeCategory === "all" ? undefined : activeCategory, safePage + 1)}
              className="rounded-sm border border-(--border-color) bg-(--bg) px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary/40 dark:text-neutral-300"
            >
              {c.next} →
            </Link>
          ) : (
            <span className="cursor-default rounded-sm border border-(--border-color) px-4 py-2 text-sm font-medium text-neutral-300 dark:text-neutral-600">
              {c.next} →
            </span>
          )}
        </div>
      )}
    </div>
  );
}
