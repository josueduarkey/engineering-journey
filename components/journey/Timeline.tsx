"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getLocaleValue,
  type JourneyMilestone,
  type Locale,
} from "@/lib/content";
import TagList from "@/components/shared/TagList";
import JourneyImageStack from "@/components/journey/JourneyImageStack";

type TimelineProps = {
  milestones: JourneyMilestone[];
  locale: Locale;
};

const viewProjectsLabel: Record<Locale, string> = {
  es: "Ver proyectos",
  en: "See projects",
};

// ─── Individual milestone — own useInView for bidirectional scroll animation ──
function TimelineMilestone({
  milestone,
  locale,
  index,
}: {
  milestone: JourneyMilestone;
  locale: Locale;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  // once: false → re-triggers every time the element enters/leaves the viewport
  const isInView = useInView(ref, { margin: "-80px 0px", once: false });

  const title       = getLocaleValue(milestone.title, locale);
  const institution = getLocaleValue(milestone.institution, locale);
  const year        = getLocaleValue(milestone.year, locale);
  const textFirst   = index % 2 === 0;

  const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <article
      ref={ref}
      className="relative grid gap-8 pl-12 lg:grid-cols-2 lg:gap-16 lg:pl-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-3 h-8 w-8 rounded-full border-4 border-[var(--bg)] bg-secondary shadow-[0_0_0_1px_var(--border-color)] lg:left-1/2 lg:-translate-x-1/2" />

      {/* Text side — slides up/down */}
      <motion.div
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 28 }}
        transition={transition}
        className={textFirst ? "lg:pr-10 lg:text-right" : "lg:col-start-2 lg:pl-10"}
      >
        <a
          href={milestone.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline text-sm font-semibold text-primary pr-2 hover:underline"
        > 
          {institution}
        </a>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">|</span>
        <span className="pl-2 text-sm text-neutral-500 dark:text-neutral-400">{year}</span>

        <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400 md:text-base">
          {getLocaleValue(milestone.description, locale)}
        </p>

        <div className="mt-5">
          <TagList
            tags={milestone.skills}
            tone="neutral"
            className={textFirst ? "lg:justify-end" : ""}
          />
        </div>

        {milestone.projectsHref && (
          <div className={`mt-6 flex ${textFirst ? "lg:justify-end" : ""}`}>
            <Link
              href={milestone.projectsHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              {viewProjectsLabel[locale]}
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </motion.div>

      {/* Image side — slides from side + scales */}
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          scale:   isInView ? 1 : 0.96,
          x:       isInView ? 0 : (textFirst ? 24 : -24),
        }}
        transition={{ ...transition, delay: isInView ? 0.1 : 0 }}
        className={
          textFirst
            ? "lg:col-start-2 lg:row-start-1 lg:pl-10"
            : "lg:col-start-1 lg:row-start-1 lg:flex lg:justify-end lg:pr-10"
        }
      >
        <JourneyImageStack gallery={milestone.gallery} locale={locale} title={title} />
      </motion.div>
    </article>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
export default function Timeline({ milestones, locale }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-[var(--border-color)] lg:left-1/2" />
      <div className="space-y-20">
        {milestones.map((milestone, index) => (
          <TimelineMilestone
            key={`${getLocaleValue(milestone.institution, locale)}-${index}`}
            milestone={milestone}
            locale={locale}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
