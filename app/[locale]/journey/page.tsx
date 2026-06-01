import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import Timeline from "@/components/journey/Timeline";
import { journeyMilestones, type Locale } from "@/lib/content";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Josueduardev",
  description:
    "Timeline of Josue Garcia's academic, technical, and engineering growth.",
};

const copy = {
  es: {
    title: "Una trayectoria construida por etapas.",
  },
  en: {
    title: "A journey built in stages.",
  },
} as const;

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;

}) {
  const { locale } = await params;
  const c = copy[locale];
  const t = await getTranslations("Navigation");
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader eyebrow={t("journey")}
        title={c.title} />
      <div className="mt-16">
        <Timeline milestones={journeyMilestones} locale={locale} />
      </div>
    </div>
  );
}
