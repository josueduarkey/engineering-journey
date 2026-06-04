import { notFound } from "next/navigation";

// Catch-all for any route under [locale] that doesn't match a real page.
// Calls notFound() so Next.js triggers app/[locale]/not-found.tsx.
// Specific routes (about, projects, blog, etc.) take priority over this.
export default function CatchAll() {
  notFound();
}
