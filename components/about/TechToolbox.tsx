"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Braces, Database, Sparkles, Wrench } from "lucide-react";
import { techStack } from "@/lib/stack";
import StackIcon from "@/components/shared/StackIcon";
import type { Locale } from "@/lib/content";

const categoryIcons = { frontend: Braces, backend: Database, tools: Wrench, ai: Sparkles };

export default function TechToolbox({ locale }: { locale: Locale }) {
  const [activeCategory, setActiveCategory] = useState(techStack[0].id);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const activeGroup = techStack.find((group) => group.id === activeCategory)!;

  return (
    <div>
      <div role="group" aria-label={locale === "es" ? "Filtrar herramientas por categoría" : "Filter tools by category"} className="flex flex-wrap gap-2">
        {techStack.map((group) => {
          const Icon = categoryIcons[group.id as keyof typeof categoryIcons] ?? Wrench;
          const active = activeCategory === group.id;

          return (
            <button key={group.id} type="button" aria-pressed={active} aria-controls={id} onClick={() => setActiveCategory(group.id)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${active ? "border-primary/30 bg-primary/10 text-primary" : "border-(--border-color) bg-(--bg) text-neutral-500 hover:border-primary/30 hover:text-primary dark:text-neutral-400"}`}>
              <Icon size={14} aria-hidden="true" />{group.label[locale]}
            </button>
          );
        })}
      </div>

      <div id={id} role="region" aria-label={activeGroup.label[locale]} className="mt-6">
        <motion.ul key={activeCategory} className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {activeGroup.items.map((item, index) => (
            <motion.li key={item.name} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={reducedMotion ? undefined : { y: -3 }} transition={{ duration: reducedMotion ? 0 : 0.2, delay: reducedMotion ? 0 : index * 0.025 }} className="flex items-center gap-3 rounded-xl border border-(--border-color) bg-(--bg) px-4 py-4 transition-colors hover:border-primary/30">
              <div aria-hidden="true" className="shrink-0">
                <StackIcon name={item.name} lightSrc={item.lightSrc} darkSrc={item.darkSrc} size={28} />
              </div>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{item.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
