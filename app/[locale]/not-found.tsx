import { ArrowLeft, Terminal } from "lucide-react";

const links = [
  { label: "Inicio", href: "/es" },
  { label: "Sobre mí", href: "/es/about" },
  { label: "Proyectos", href: "/es/projects" },
  { label: "Blog", href: "/es/blog" },
  { label: "Contacto", href: "/es/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-24 text-center lg:min-h-screen">
      {/* Terminal badge */}
      <div className="mb-8 flex items-center gap-2 rounded-full border border-(--border-color) bg-(--bg) px-4 py-2">
        <Terminal size={14} className="text-primary" />
        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <span className="text-primary">error</span>
          {" · "}
          <span className="text-secondary">404</span>
          {" · "}
          <span>page_not_found</span>
        </span>
      </div>

      {/* Big 404 */}
      <h1 className="select-none bg-linear-to-br from-primary via-primary/60 to-secondary bg-clip-text text-[10rem] font-black leading-none text-transparent md:text-[14rem]">
        404
      </h1>

      {/* Message */}
      <p className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-white md:text-3xl">
        Esta ruta no existe en el sistema.
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        La página que buscas no fue encontrada. Puede haber sido movida,
        eliminada, o simplemente nunca existió.
      </p>

      {/* Code block style */}
      <div className="mx-auto mt-8 w-full max-w-sm rounded-sm border border-(--border-color) bg-neutral-50 px-5 py-4 text-left font-mono text-xs dark:bg-neutral-900">
        <span className="text-neutral-400">$ </span>
        <span className="text-primary">GET</span>
        <span className="text-neutral-500"> /ruta-no-encontrada</span>
        <br />
        <span className="text-secondary">→</span>
        <span className="text-neutral-500"> 404 Not Found</span>
        <br />
        <span className="text-neutral-400 opacity-60">
          Sugerencia: navega a una ruta válida ↓
        </span>
      </div>

      {/* Nav links */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-(--border-color) bg-(--bg) px-5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary/40 hover:text-primary dark:text-neutral-300"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Back link */}
      <a
        href="/es"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary dark:text-neutral-400"
      >
        <ArrowLeft size={14} />
        Volver al inicio
      </a>
    </div>
  );
}
