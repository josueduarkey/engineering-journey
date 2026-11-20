import { getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const es = (await getLocale()) === "es";
  return (
    <footer className="portfolio-footer">
      <div className="footer-inner">
        <div className="footer-invitation"><div><p className="editorial-label">{es ? "EL PRÓXIMO PROYECTO" : "THE NEXT PROJECT"}</p><h2>{es ? <>¿Construimos<br />algo <em>juntos?</em></> : <>Let&apos;s build<br />something <em>together.</em></>}</h2></div><Link href="/contact" className="footer-contact" aria-label={es ? "Contactar a Josué" : "Contact Josué"}><ArrowUpRight size={42} strokeWidth={1.3} /></Link></div>
        <div className="footer-details"><a href="mailto:josueduardo.dev@gmail.com">josueduardo.dev@gmail.com<ArrowUpRight size={15} /></a><div><a href="https://github.com/josueduarkey" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/josueduardogarcia/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/Josue-Garcia-CV.pdf" target="_blank" rel="noopener noreferrer">CV ↗</a></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Josué García</span><span>{es ? "Hecho con intención, desde El Salvador." : "Made with intention, from El Salvador."}</span><a href="#">{es ? "Volver arriba ↑" : "Back to top ↑"}</a></div>
      </div>
    </footer>
  );
}
