type Platform = "github" | "linkedin" | "email";

type Props = {
  platform: Platform;
  size?: number;
  className?: string;
};

export default function BrandIcon({ platform, size = 24, className = "" }: Props) {
  const s = `${size}px`;

  if (platform === "github") {
    return (
      <>
        <img
          src="/GitHub_light.svg"
          alt="GitHub"
          width={size}
          height={size}
          style={{ width: s, height: s }}
          className={`dark:hidden ${className}`}
        />
        <img
          src="/GitHub_dark.svg"
          alt="GitHub"
          width={size}
          height={size}
          style={{ width: s, height: s }}
          className={`hidden dark:block ${className}`}
        />
      </>
    );
  }

  const srcs: Record<Exclude<Platform, "github">, string> = {
    linkedin: "/linkedin.svg",
    email: "/gmail.svg",
  };

  return (
    <img
      src={srcs[platform]}
      alt={platform}
      width={size}
      height={size}
      style={{ width: s, height: s }}
      className={className}
    />
  );
}
