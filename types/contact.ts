export type Platform = "email" | "linkedin" | "github";

export type Channel = {
  platform: Platform;
  label: string;
  value: string;
  href: string;
  note: string;
};
