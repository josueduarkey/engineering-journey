import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  certifications,
  certificationCategories,
  formatCertDate,
  buildCertHref,
} from "@/lib/certifications";
import type { Locale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certificaciones",
  description: "Certificaciones y cursos completados por Josué García.",
};

// ─── Copy (UI text only — datos en lib/certifications.ts) ────────────────────

const copy: Record<Locale, {
  eyebrow: string; title: string; description: string;
  empty: string; emptySub: string;
  prev: string; next: string; pageOf: string;
  sortAsc: string; sortDesc: string;
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
    sortAsc: "Más antiguos primero",
    sortDesc: "Más recientes primero",
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
    sortAsc: "Oldest first",
    sortDesc: "Newest first",
  },
};

const PAGE_SIZE = 12;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CertificationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; page?: string; order?: string }>;
}) {
  const { locale } = await params;
  const { category: rawCategory, page: rawPage, order: rawOrder } = await searchParams;
  const t = await getTranslations("Navigation");
  const c = copy[locale];

  const activeCategory = rawCategory && rawCategory !== "all" ? rawCategory : "all";
  const order = rawOrder === "asc" ? "asc" : "desc";
  const currentPage = Math.max(1, parseInt(rawPage ?? "1", 10));
  const cat = activeCategory === "all" ? undefined : activeCategory;
  const orderParam = order === "desc" ? undefined : order;

  const filtered = cat
    ? certifications.filter((cert) => cert.category === cat)
    : certifications;

  const sorted = [...filtered].sort((a, b) =>
    order === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const toggleOrderHref = buildCertHref({
    category: cat,
    order: order === "desc" ? "asc" : "desc",
  });

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader eyebrow={t("achievements")} title={c.title} description={c.description} />

      {/* ── Filters + sort row ───────────────────────────────────────────── */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {certificationCategories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <Link
                key={category.id}
                href={buildCertHref({
                  category: category.id === "all" ? undefined : category.id,
                  order: orderParam,
                })}
                className={[
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-(--border-color) bg-(--bg) text-neutral-600 hover:border-primary/40 hover:text-primary dark:text-neutral-400",
                ].join(" ")}
              >
                {category.label[locale]}
              </Link>
            );
          })}
        </div>

        {/* Sort toggle — Link preserves category, flips order, resets to page 1 */}
        <Link
          href={toggleOrderHref}
          className="inline-flex items-center gap-2 rounded-sm border border-(--border-color) bg-(--bg) px-4 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:border-primary/40 hover:text-primary dark:text-neutral-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {order === "desc" ? (
              <>
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </>
            ) : (
              <>
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </>
            )}
          </svg>
          {order === "desc" ? c.sortDesc : c.sortAsc}
        </Link>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <div className="mt-8">
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
                      {formatCertDate(cert.date, locale)}
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
              href={buildCertHref({ category: cat, order: orderParam, page: safePage - 1 })}
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
              href={buildCertHref({ category: cat, order: orderParam, page: safePage + 1 })}
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
