import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import Timeline from "@/components/journey/Timeline";
import { journeyMilestones, type Locale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trayectoria",
  description: "Timeline de crecimiento académico, técnico y personal de Josué García.",
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
