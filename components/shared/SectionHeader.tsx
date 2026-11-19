type SectionHeaderProps = {
  as?: "h1" | "h2" | "h3";
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  as: Heading = "h2",
  id,
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className="max-w-4xl">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400 md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
