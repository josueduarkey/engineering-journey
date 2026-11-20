import SectionHeader from "@/components/shared/SectionHeader";
import PortfolioProjectCard from "./PortfolioProjectCard";
import { portfolioProjects } from "@/lib/portfolio-projects";
import type { Locale } from "@/lib/content";

export default function ProfessionalProjects({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <section aria-labelledby="professional-projects-title">
      <SectionHeader id="professional-projects-title" title={es ? "Proyectos profesionales" : "Professional projects"} description={es ? "Lo que desarrollé y en lo que colaboré dentro de cada empresa. Abre cada proyecto para conocer mi aporte." : "What I built and contributed to at each company. Open a project to explore my contribution."} />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioProjects.filter((project) => project.company).map((project) => <PortfolioProjectCard key={project.slug} project={project} locale={locale} />)}
      </div>
    </section>
  );
}
