"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  loadingLabel: string;
  errorLabel: string;
};

export default function CertificationImage({ src, alt, loadingLabel, errorLabel }: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900"
      aria-busy={status === "loading"}
    >
      <Image
        src={src}
        alt={alt}
        fill
        aria-hidden={status !== "loaded"}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={`object-cover transition-[opacity,transform] duration-300 group-hover:scale-[1.03] ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {status === "loading" && (
        <div role="status" className="absolute inset-0 flex items-center justify-center p-6 motion-safe:animate-pulse">
          <span className="sr-only">{loadingLabel}: {alt}</span>
          <div aria-hidden="true" className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-sm border border-neutral-200 bg-white/60 px-6 dark:border-neutral-800 dark:bg-neutral-800/50">
            <div className="h-2 w-2/3 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-2 w-1/2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="mt-2 h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>
      )}

      {status === "error" && (
        <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <ImageOff size={28} aria-hidden="true" />
          <p>{errorLabel}</p>
        </div>
      )}
    </div>
  );
}
