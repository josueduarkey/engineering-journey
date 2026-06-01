"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getLocaleValue, type JourneyMilestone, type Locale } from "@/lib/content";

type JourneyImageStackProps = {
  gallery: JourneyMilestone["gallery"];
  locale: Locale;
  title: string;
};

export default function JourneyImageStack({
  gallery,
  locale,
  title,
}: JourneyImageStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (gallery.length === 0) {
    return null;
  }

  const orderedImages = gallery.map((_, index) => {
    const imageIndex = (activeIndex + index) % gallery.length;
    return gallery[imageIndex];
  });
  const actionLabel =
    locale === "en" ? `Cycle images for ${title}` : `Pasar imagenes de ${title}`;
  const hint = locale === "en" ? "Click to cycle" : "Click para pasar";

  return (
    <button
      type="button"
      onClick={() => setActiveIndex((current) => (current + 1) % gallery.length)}
      className="group relative h-64 w-full max-w-[420px] cursor-pointer rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] sm:h-72"
      aria-label={actionLabel}
    >
      {orderedImages.map((image, stackIndex) => {
        const isFront = stackIndex === 0;

        return (
          <motion.div
            key={`${image.src}-${getLocaleValue(image.alt, locale)}`}
            className="absolute inset-0 overflow-hidden rounded-sm border border-[var(--border-color)] bg-[var(--bg)] shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            initial={false}
            animate={{
              x: stackIndex * 14,
              y: stackIndex * 12,
              rotate: stackIndex === 0 ? 0 : stackIndex % 2 === 0 ? 4 : -4,
              scale: 1 - stackIndex * 0.045,
              opacity: 1 - stackIndex * 0.16,
              zIndex: gallery.length - stackIndex,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
              mass: 0.7,
            }}
          >
            <Image
              src={image.src}
              alt={getLocaleValue(image.alt, locale)}
              width={720}
              height={520}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority={isFront}
            />
            {isFront ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                  {hint}
                </span>
              </div>
            ) : null}
          </motion.div>
        );
      })}
    </button>
  );
}
