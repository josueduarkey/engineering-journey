"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import type { Locale } from "@/lib/content";

const circumference = 2 * Math.PI * 19;

export default function TimelineScrollIndicator({ progress, reducedMotion, locale }: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  locale: Locale;
}) {
  const [percentage, setPercentage] = useState(0);
  const dashOffset = useTransform(progress, [0, 1], [circumference, 0]);
  const rotation = useTransform(progress, [0, 1], [0, 360]);

  useMotionValueEvent(progress, "change", (value) => {
    setPercentage(Math.round(Math.min(1, Math.max(0, value)) * 100));
  });

  return (
    <div
      role="progressbar"
      aria-label={locale === "es" ? "Recorrido por la experiencia profesional" : "Professional experience reading progress"}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="sticky top-28 flex flex-col items-center gap-1 bg-(--bg) py-2"
    >
      <div aria-hidden="true" className="relative h-8 w-8 sm:h-11 sm:w-11">
        <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
          <circle cx="24" cy="24" r="19" stroke="var(--border-color)" strokeWidth="2" />
          <motion.circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={circumference} style={{ strokeDashoffset: dashOffset }} transform="rotate(-90 24 24)" className="text-primary" />
        </svg>
        <motion.span style={{ rotate: reducedMotion ? 0 : rotation }} className="absolute inset-0 flex items-center justify-center text-primary">
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 sm:h-5 sm:w-5">
            <circle cx="10" cy="10" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 4.5v11M4.5 10h11M6.1 6.1l7.8 7.8M6.1 13.9l7.8-7.8" stroke="currentColor" strokeWidth="1" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </motion.span>
      </div>
      <span aria-hidden="true" className="font-mono text-[9px] tabular-nums text-neutral-500 dark:text-neutral-400">{percentage}%</span>
    </div>
  );
}
