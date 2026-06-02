import type { Locale } from "@/lib/content";
import type { Category, Certification } from "@/types/certification";

// ─── Data ─────────────────────────────────────────────────────────────────────
// Para agregar: { id, name, issuer, date: "YYYY-MM", image, url?, category }

export const certifications: Certification[] = [
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
    name: { es: "Curso de Backend con ExpressJS", en: "Backend Course with Express JS" },
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
    name: { es: "Diploma de PBS mentoring", en: "Diploma of Participation in PBS Mentoring" },
    issuer: "PBS x FGK",
    date: "2025-10",
    image: "/achievements/pbs-mentoring.png",
    url: "https://drive.google.com/file/d/1m1CUXyC33pX0kUWpJhM__YOYAmmJINiw/preview",
    category: "talleres",
  },
  {
    id: "PLATZI-03",
    name: { es: "Curso de Ingeniería de Software", en: "Software Engineering Course" },
    issuer: "Platzi - Escuela de Desarrollo Software",
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

export const certificationCategories: { id: Category | "all"; label: Record<Locale, string> }[] = [
  { id: "all",         label: { es: "Todos",         en: "All"        } },
  { id: "dev",         label: { es: "Desarrollador", en: "Developer"  } },
  { id: "ai",          label: { es: "AI",             en: "AI"         } },
  { id: "soft-skills", label: { es: "Soft Skills",   en: "Soft Skills"} },
  { id: "talleres",    label: { es: "Talleres",       en: "Workshops"  } },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatCertDate(yyyymm: string, locale: Locale): string {
  const [year, month] = yyyymm.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-SV", {
    month: "long",
    year: "numeric",
  });
}

export function buildCertHref(params: {
  category?: string;
  page?: number;
  order?: string;
}): string {
  const p = new URLSearchParams();
  if (params.category && params.category !== "all") p.set("category", params.category);
  if (params.order && params.order !== "desc") p.set("order", params.order);
  if (params.page && params.page > 1) p.set("page", String(params.page));
  const qs = p.toString();
  return `/certifications${qs ? `?${qs}` : ""}`;
}
