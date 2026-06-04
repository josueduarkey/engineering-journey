import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import Timeline from "@/components/journey/Timeline";
import { journeyMilestones, type Locale } from "@/lib/content";

const ogImage = `/og?title=Trayectoria&description=Timeline+de+crecimiento+acad%C3%A9mico%2C+t%C3%A9cnico+y+personal+de+Josu%C3%A9+Garc%C3%ADa.`;

export const metadata: Metadata = {
  title: "Trayectoria",
  description: "Timeline de crecimiento académico, técnico y personal de Josué García — desde la infancia hasta Key Institute.",
  openGraph: {
    title: "Trayectoria — Josué García",
    description: "Timeline de crecimiento académico, técnico y personal.",
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Trayectoria — Josué García", images: [ogImage] },
};

const copy: Record<Locale, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: "Trayectoria",
    title: "Un camino que se sigue construyendo",
    description: "Aprendiendo, construyendo y mejorando en cada etapa del camino.",
  },
  en: {
    eyebrow: "Journey",
    title: "A journey built in stages.",
    description: "Each stage added something different: skills, character, judgment. Here is the record.",
  },
};

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = copy[locale];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <div className="mt-16">
        <Timeline milestones={journeyMilestones} locale={locale} />
      </div>
    </div>
  );
}
