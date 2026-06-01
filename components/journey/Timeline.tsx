"use client";

import { motion } from "framer-motion";
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

export default function Timeline({ milestones, locale }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-[var(--border-color)] lg:left-1/2" />
      <div className="space-y-20">
        {milestones.map((milestone, index) => {
          const title = getLocaleValue(milestone.title, locale);
          const textFirst = index % 2 === 0;

          return (
            <motion.article
              key={`${milestone.institution}-${title}`}
              className="relative grid gap-8 pl-12 lg:grid-cols-2 lg:gap-16 lg:pl-0"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute left-0 top-3 h-8 w-8 rounded-full border-4 border-[var(--bg)] bg-secondary shadow-[0_0_0_1px_var(--border-color)] lg:left-1/2 lg:-translate-x-1/2" />

              <div
                className={
                  textFirst
                    ? "lg:pr-10 lg:text-right"
                    : "lg:col-start-2 lg:pl-10"
                }
              >
                <p className="text-sm font-semibold text-primary inline px-2">{milestone.institution}</p> 
                <span className="text-sm text-neutral-500 dark:text-neutral-400">|</span>
                <span className="pl-2 text-sm text-neutral-500 dark:text-neutral-400">{milestone.year}</span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white md:text-3xl">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400 md:text-base">
                  {getLocaleValue(milestone.description, locale)}
                </p>
                <div className={`mt-5 flex ${textFirst ? "lg:justify-end" : ""}`}>
                  <TagList tags={milestone.skills} tone="neutral" />
                </div>
              </div>

              <motion.div
                className={
                  textFirst
                    ? "lg:col-start-2 lg:row-start-1 lg:pl-10"
                    : "lg:col-start-1 lg:row-start-1 lg:flex lg:justify-end lg:pr-10"
                }
                initial={{ opacity: 0, scale: 0.96, x: textFirst ? 24 : -24 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{
                  delay: 0.12,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <JourneyImageStack
                  gallery={milestone.gallery}
                  locale={locale}
                  title={title}
                />
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
