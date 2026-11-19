import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import Timeline from "@/components/journey/Timeline";
import { journeyMilestones, type Locale } from "@/lib/content";

const copy: Record<Locale, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: "Educación",
    title: "Mi formación académica",
    description: "Las etapas de mi educación, desde mis primeros aprendizajes hasta la ingeniería en Key Institute.",
  },
  en: {
    eyebrow: "Education",
    title: "My education",
    description: "The stages of my education, from my earliest learning experiences to engineering at Key Institute.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = copy[locale];
  const title = `${c.eyebrow} — Josué García`;
  const ogImage = `/og?title=${encodeURIComponent(c.eyebrow)}&description=${encodeURIComponent(c.description)}`;

  return {
    title: c.eyebrow,
    description: c.description,
    alternates: { canonical: `/${locale}/journey` },
    openGraph: {
      title,
      description: c.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, images: [ogImage] },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = copy[locale];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <SectionHeader as="h1" eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <div className="mt-16">
        <Timeline milestones={journeyMilestones} locale={locale} />
      </div>
    </div>
  );
}
