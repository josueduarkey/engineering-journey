import { ViewTransition } from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ventures } from "@/lib/ventures";
import type { Locale } from "@/lib/content";
import AsciiSignature from "./AsciiSignature";

export default function PortfolioIntro({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <>
      <section className="intro-section" aria-labelledby="intro-title">
        <h1 id="intro-title" className="sr-only">{es ? "Josué García — desarrollador web. josueduardo.dev" : "Josué García — web developer. josueduardo.dev"}</h1>
        <AsciiSignature />
      </section>

      <section id="about-me" className="about-summary" aria-labelledby="about-me-title">
        <div className="about-summary-copy">
          <p className="editorial-label">01 / {es ? "SOBRE MÍ" : "ABOUT ME"}</p>
          <h2 id="about-me-title">{es ? "Soy Josué García." : "I'm Josué García."}</h2>
          <p className="about-summary-lead">
            {es
              ? "Desarrollador web, estudiante de ingeniería en Key Institute y emprendedor en El Salvador."
              : "Web developer, engineering student at Key Institute, and entrepreneur based in El Salvador."}
          </p>
          <p className="about-summary-description">
            {es
              ? "Construyo aplicaciones e integro sistemas para simplificar el trabajo de las personas. Actualmente realizo una pasantía híbrida en Impresos Múltiples y desarrollo productos propios como FocuMinds, Spotmi y TelMoney."
              : "I build applications and connect systems to make people's work simpler. I'm currently a hybrid intern at Impresos Múltiples and developing my own products: FocuMinds, Spotmi, and TelMoney."}
          </p>
          <div className="about-summary-actions">
            <Link href="/contact">{es ? "Hablemos" : "Let's talk"}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="/Josue-Garcia-CV.pdf" download>{es ? "Descargar CV" : "Download CV"}<Download size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="about-summary-portrait">
          <div className="about-summary-photo">
            <Image src="/josue-garcia-portrait.jpg" alt={es ? "Retrato de Josué García" : "Portrait of Josué García"} fill sizes="(min-width: 768px) 260px, 220px" className="object-cover" />
          </div>
          <figcaption>{es ? "Aprender. Construir. Aportar." : "Learn. Build. Contribute."}</figcaption>
        </figure>
      </section>

      <section id="selected-work" className="selected-work" aria-labelledby="selected-title">
        <div className="section-heading-row"><div><p className="editorial-label">02 / {es ? "PRODUCTOS PROPIOS" : "MY PRODUCTS"}</p><h2 id="selected-title">{es ? "De una idea a algo real." : "From an idea to something real."}</h2></div><Link href="/projects">{es ? "Todos los proyectos" : "All projects"}<ArrowUpRight size={18} /></Link></div>
        <div className="selected-grid">{ventures.map((venture, index) => <Link href={`/projects/${venture.id}`} transitionTypes={["project-forward"]} key={venture.id} className="selected-project"><ViewTransition name={`project-cover-${venture.id}`} share="project-morph"><div className={`selected-image selected-image-${venture.id}`}><Image src={venture.gallery[0].src} alt={venture.gallery[0].alt[locale]} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 48vw, 90vw" className="object-contain transition-transform duration-500 group-hover:scale-105" /><span className="project-open"><ArrowUpRight size={19} /></span></div></ViewTransition><div className="selected-caption"><span className="project-number">0{index + 1}</span><div><h3>{venture.name}</h3><p>{venture.category[locale]}</p></div><ArrowUpRight size={18} /></div></Link>)}</div>
      </section>
    </>
  );
}
