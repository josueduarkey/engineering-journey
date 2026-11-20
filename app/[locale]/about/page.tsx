import type { Metadata } from "next";
import PortfolioIntro from "@/components/home/PortfolioIntro";
import TechToolbox from "@/components/about/TechToolbox";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Locale } from "@/lib/content";
const copy = {
  es: {
    stackTitle: "Las herramientas detrás de las ideas.",
    stackDescription: "Mi stack de desarrollo. Explora las tecnologías que uso para construir y conectar productos.",
    experienceTitle: "Experiencia en problemas reales.",
    experienceDescription: "Desarrollo web, integración de APIs y plataformas empresariales. Este es mi recorrido y lo que he aportado en cada etapa.",
  },
  en: {
    stackTitle: "The tools behind the ideas.",
    stackDescription: "My development stack. Explore the technologies I use to build and connect products.",
    experienceTitle: "Experience with real problems.",
    experienceDescription: "Web development, API integration, and enterprise platforms. My journey and contributions at every stage.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "es" ? "Sobre mí" : "About";
  const description = locale === "es"
    ? "Josué García, desarrollador web y estudiante de ingeniería. Aplicaciones, integraciones empresariales y productos propios: FocuMinds, Spotmi y TelMoney."
    : "Josué García — Engineering Student & Developer at Key Institute, El Salvador. I learn by building real systems and document every step along the way.";
  const ogTitle = locale === "es" ? "Sobre mí — Josué García" : "About — Josué García";
  const ogDescription = locale === "es"
    ? "Engineering Student & Developer en Key Institute, El Salvador."
    : "Engineering Student & Developer at Key Institute, El Salvador.";
  const ogImage = `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(ogDescription)}`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/about` },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, images: [ogImage] },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = copy[locale];

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-8 md:pb-24 md:pt-10">

      <PortfolioIntro locale={locale} />

      <section
        id="experience"
        aria-labelledby="experience-title"
        className="experience-section"
      >
        <div className="section-heading-row">
          <SectionHeader
            id="experience-title"
            eyebrow={locale === "es" ? "03 / EXPERIENCIA PROFESIONAL" : "03 / PROFESSIONAL EXPERIENCE"}
            title={c.experienceTitle}
            description={c.experienceDescription}
          />
        </div>
        <div className="mt-10">
          <ExperienceTimeline locale={locale} />
        </div>
      </section>

      <section aria-labelledby="toolbox-title" className="mt-20 border-t border-(--border-color) pt-16">
        <SectionHeader id="toolbox-title" eyebrow={locale === "es" ? "04 / HERRAMIENTAS" : "04 / TOOLS"} title={c.stackTitle} description={c.stackDescription} />
        <div className="mt-8">
          <TechToolbox locale={locale} />
        </div>
      </section>
    </div>
  );
}
