type Props = {
  name: string;
  lightSrc: string;
  darkSrc?: string;
  size?: number;
};

// Server component — CSS dark mode switching, no JS needed.
// darkSrc is optional: when omitted, lightSrc is used in both modes.
export default function StackIcon({ name, lightSrc, darkSrc, size = 36 }: Props) {
  const s = `${size}px`;
  const hasDark = Boolean(darkSrc);

  return (
    <div className="group relative flex items-center justify-center">
      {/* Light icon — hidden in dark mode when a dark variant exists */}
      <img
        src={lightSrc}
        alt={name}
        width={size}
        height={size}
        style={{ width: s, height: s }}
        className={hasDark ? "dark:hidden" : ""}
      />

      {/* Dark icon — shown only in dark mode */}
      {hasDark && (
        <img
          src={darkSrc}
          alt={name}
          width={size}
          height={size}
          style={{ width: s, height: s }}
          className="hidden dark:block"
        />
      )}

      {/* Tooltip */}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 dark:bg-white dark:text-neutral-900">
        {name}
      </span>
    </div>
  );
}