import Image from "next/image";
import { Waypoints } from "lucide-react";
import { technologyIcons } from "@/lib/technology-icons";

export default function TechnologyChip({ name }: { name: string }) {
  const icon = technologyIcons[name];

  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-(--border-color) bg-(--surface) px-2.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
      {icon ? (
        <span aria-hidden="true" className={`flex h-4 w-4 shrink-0 items-center justify-center ${icon.darkBackground ? "rounded-sm bg-neutral-900 p-0.5" : ""}`}>
          <Image src={icon.src} alt="" width={16} height={16} className={`h-full w-full object-contain ${icon.darkSrc ? "dark:hidden" : ""} ${icon.monochrome ? "dark:invert" : ""}`} />
          {icon.darkSrc && (
            <Image src={icon.darkSrc} alt="" width={16} height={16} className="hidden h-full w-full object-contain dark:block" />
          )}
        </span>
      ) : name === "APIs REST" ? (
        <Waypoints size={16} aria-hidden="true" className="shrink-0 text-neutral-500 dark:text-neutral-400" />
      ) : null}
      {name}
    </span>
  );
}
