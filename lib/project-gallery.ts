import type { Locale } from "@/lib/content";

export type ProjectGalleryImage = {
  src: string;
  alt: Record<Locale, string>;
  caption?: Record<Locale, string>;
};
