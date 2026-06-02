"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getLocaleValue, type JourneyMilestone, type Locale } from "@/lib/content";

const AUTO_ADVANCE_MS = 5000;

type Props = {
  gallery: JourneyMilestone["gallery"];
  locale: Locale;
  title: string;
};

export default function JourneyImageStack({ gallery, locale, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Bumping this key resets the auto-advance countdown on manual click
  const [timerKey, setTimerKey] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    if (gallery.length <= 1) return;
    const id = setInterval(advance, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [advance, gallery.length, timerKey]);

  const handleClick = () => {
    advance();
    setTimerKey((k) => k + 1);
  };

  if (gallery.length === 0) return null;

  // Reorder gallery starting at activeIndex — stable image.src keys give Framer
  // Motion a continuous element to animate rather than unmount/remount.
  const orderedImages = gallery.map((_, i) => gallery[(activeIndex + i) % gallery.length]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={locale === "en" ? `Cycle images for ${title}` : `Pasar imágenes de ${title}`}
      className="group relative h-64 w-full max-w-[450px] cursor-pointer rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] sm:h-72"
    >
      {orderedImages.map((image, stackIndex) => (
        <motion.div
          // Stable key by src keeps the element mounted and lets spring animate
          // smoothly between stack positions instead of re-mounting on each advance.
          key={image.src}
          className="absolute inset-0 overflow-hidden rounded-sm border border-[var(--border-color)] bg-[var(--bg)] shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          initial={false}
          animate={{
            x:       stackIndex * 14,
            y:       stackIndex * 12,
            rotate:  stackIndex === 0 ? 0 : stackIndex % 2 === 0 ? 4 : -4,
            scale:   1 - stackIndex * 0.045,
            opacity: 1 - stackIndex * 0.16,
            zIndex:  gallery.length - stackIndex,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
        >
          <Image
            src={image.src}
            alt={getLocaleValue(image.alt, locale)}
            width={720}
            height={520}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={stackIndex === 0}
          />
        </motion.div>
      ))}
    </button>
  );
}
