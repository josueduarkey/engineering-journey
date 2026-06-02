import type { Locale } from "@/lib/content";

export function formatDate(yyyymm: string, locale: Locale): string {
  const [year, month] = yyyymm.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-SV", {
    month: "long",
    year: "numeric",
  });
}

export function buildHref(category?: string, page?: number): string {
  const p = new URLSearchParams();
  if (category && category !== "all") p.set("category", category);
  if (page && page > 1) p.set("page", String(page));
  const qs = p.toString();
  return `/certifications${qs ? `?${qs}` : ""}`;
}
