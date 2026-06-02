"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = {
  value: string;
  label: string;
  copiedLabel: string;
};

export default function CopyButton({ value, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    // Stop the parent <a> from navigating when this button is clicked
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available (HTTP, old browser) — silently ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        copied
          ? "border-secondary/40 bg-secondary/10 text-secondary"
          : "border-(--border-color) bg-(--bg) text-neutral-500 hover:border-primary/40 hover:text-primary dark:text-neutral-400",
      ].join(" ")}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? copiedLabel : label}
    </button>
  );
}
