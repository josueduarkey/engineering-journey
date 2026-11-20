import type { Locale } from "@/lib/content";
import type { ProjectGalleryImage } from "@/lib/project-gallery";
import { ventures } from "@/lib/ventures";
import { experiences } from "@/lib/experience";

export type PortfolioProject = {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  category: Record<Locale, string>;
  technologies: string[];
  highlights: Record<Locale, string[]>;
  gallery: ProjectGalleryImage[];
  url: string;
  linkLabel: Record<Locale, string>;
  company?: string;
  role?: Record<Locale, string>;
  period?: Record<Locale, string>;
};

export const portfolioProjects: PortfolioProject[] = [
  ...ventures.map((venture) => ({
    slug: venture.id,
    title: { es: venture.name, en: venture.name },
    summary: venture.description,
    category: venture.category,
    technologies: venture.technologies,
    highlights: venture.highlights,
    gallery: venture.gallery,
    url: venture.url,
    linkLabel: { es: `Visitar ${venture.name}`, en: `Visit ${venture.name}` },
  })),
  ...experiences.map((experience) => ({
    slug: experience.id,
    title: experience.projectTitle,
    summary: experience.projectSummary,
    category: { es: "Proyecto profesional", en: "Professional project" },
    company: experience.company,
    role: experience.role,
    period: experience.period,
    technologies: experience.technologies,
    highlights: experience.highlights,
    gallery: experience.gallery,
    url: experience.projectReference?.href ?? experience.companyUrl,
    linkLabel: experience.projectReference?.label ?? { es: "Sitio de la empresa", en: "Company website" },
  })),
];
