import SectionHeader from "@/components/shared/SectionHeader";
import PortfolioProjectCard from "./PortfolioProjectCard";
import { portfolioProjects } from "@/lib/portfolio-projects";
import type { Locale } from "@/lib/content";

export default function VentureProjects({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <section id="emprendimientos" aria-labelledby="ventures-title" className="scroll-mt-24">
      <SectionHeader id="ventures-title" title={es ? "Emprendimientos" : "Ventures"} description={es ? "Productos propios para educación, turismo y finanzas. Cada uno tiene su historia, tecnologías y capturas." : "Independent products for education, tourism, and finance. Explore their story, technologies, and screenshots."} />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioProjects.filter((project) => !project.company).map((project) => <PortfolioProjectCard key={project.slug} project={project} locale={locale} />)}
      </div>
    </section>
  );
}
