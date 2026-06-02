import type { Locale } from "@/lib/content";

export type Category = "soft-skills" | "dev" | "ai" | "talleres";

export type Certification = {
  id: string;
  name: Record<Locale, string>;
  issuer: string;
  date: string;   // "YYYY-MM" — sortable, displayed as "Mes YYYY"
  image: string;
  url?: string;
  category: Category;
};
