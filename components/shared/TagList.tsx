type TagListProps = {
  tags: string[];
  tone?: "blue" | "green" | "neutral";
  className?: string;
};

const toneClasses = {
  blue: "border-primary/20 bg-primary/10 text-primary",
  green: "border-secondary/20 bg-secondary/10 text-neutral-800 dark:text-secondary",
  neutral:
    "border-neutral-200 bg-white text-neutral-600 dark:border-dark-border dark:bg-dark-surface dark:text-neutral-300",
};

export default function TagList({ tags, tone = "neutral", className = "" }: TagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClasses[tone]}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
