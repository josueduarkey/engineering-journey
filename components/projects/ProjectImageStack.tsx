"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import type { Locale } from "@/lib/content";
import type { ProjectGalleryImage } from "@/lib/project-gallery";

const copy = {
  es: {
    gallery: "Galería de",
    emptyTitle: "Capturas del proyecto",
    emptyDescription: "Imágenes próximamente",
    change: "Cambiar captura",
    previous: "Imagen anterior de",
    next: "Imagen siguiente de",
    image: "Imagen",
    of: "de",
  },
  en: {
    gallery: "Gallery for",
    emptyTitle: "Project screenshots",
    emptyDescription: "Images coming soon",
    change: "Change screenshot",
    previous: "Previous image for",
    next: "Next image for",
    image: "Image",
    of: "of",
  },
};

export default function ProjectImageStack({ images, locale, title }: {
  images: ProjectGalleryImage[];
  locale: Locale;
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const c = copy[locale];
  const count = images.length;
  const currentIndex = count ? activeIndex % count : 0;
  const currentImage = images[currentIndex];
  const multiple = count > 1;

  const advance = (direction: number) => {
    setActiveIndex((index) => (index + direction + count) % count);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      advance(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  const cards = Array.from({ length: Math.min(count, 3) }, (_, depth) => {
    const image = images[(currentIndex + depth) % count];
    return (
      <motion.span
        key={image.src}
        aria-hidden={depth !== 0}
        initial={false}
        animate={{ x: depth * 6, y: depth * 9, rotate: depth === 0 ? 0 : depth % 2 === 0 ? 2 : -2, scale: 1 - depth * 0.025, zIndex: 3 - depth }}
        transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden rounded-xl border border-(--border-color) bg-(--surface) shadow-sm"
      >
        <Image
          src={image.src}
          alt={depth === 0 ? image.alt[locale] : ""}
          fill
          loading="eager"
          sizes="(min-width: 1024px) 500px, (min-width: 640px) calc(100vw - 112px), calc(100vw - 88px)"
          className="object-contain"
        />
      </motion.span>
    );
  }).reverse();

  return (
    <figure aria-label={`${c.gallery} ${title}`} className="min-w-0">
      {count === 0 ? (
        <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-(--border-color) bg-(--surface) px-6 text-center">
          <Images size={28} strokeWidth={1.25} aria-hidden="true" className="text-neutral-400 dark:text-neutral-500" />
          <div>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{c.emptyTitle}</p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{c.emptyDescription}</p>
          </div>
        </div>
      ) : (
        <>
          <div className={multiple ? "px-3 pb-6 pt-2" : undefined}>
            {multiple ? (
              <button
                type="button"
                aria-label={`${c.change}: ${currentImage.alt[locale]}`}
                onClick={() => advance(1)}
                onKeyDown={handleKeyDown}
                className="relative block aspect-video w-full cursor-pointer rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {cards}
              </button>
            ) : (
              <div className="relative aspect-video w-full">{cards}</div>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span aria-live="polite" aria-atomic="true" className="text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
              {c.image} {currentIndex + 1} {c.of} {count}
            </span>
            {multiple && (
              <div className="flex gap-1">
                <button type="button" onClick={() => advance(-1)} aria-label={`${c.previous} ${title}`} className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-primary dark:text-neutral-300">
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => advance(1)} aria-label={`${c.next} ${title}`} className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-primary dark:text-neutral-300">
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          {currentImage.caption && <figcaption className="mt-2 text-xs leading-5 text-neutral-500 dark:text-neutral-400">{currentImage.caption[locale]}</figcaption>}
        </>
      )}
    </figure>
  );
}
