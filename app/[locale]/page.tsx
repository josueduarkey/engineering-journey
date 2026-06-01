import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const t = await getTranslations("Navigation");

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
        <span className="text-primary">Engineering</span> 
        <span className="text-neutral-900 dark:text-white"> Journey</span>
      </p>
      <h1 className="mb-6 text-5xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-6xl">
        Documentando el camino
        <br />
        <span className="text-primary">de un ingeniero.</span>
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
        Proyectos, aprendizajes y reflexiones a lo largo de una carrera y lo que nos queda... ⌛
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/journey"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {t("journey")}
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          {t("projects")}
        </Link>
      </div>
    </section>
  );
}
