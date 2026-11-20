"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { portfolioProjects } from "@/lib/portfolio-projects";

export default function LegacyProjectRedirect() {
  const router = useRouter();
  useEffect(() => {
    const redirect = () => {
      const slug = window.location.hash.slice(1);
      if (portfolioProjects.some((project) => project.slug === slug)) {
        router.replace(`/projects/${slug}`);
      }
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [router]);
  return null;
}
