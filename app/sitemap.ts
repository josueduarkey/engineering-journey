import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://josueduardo.dev";
const locales = ["es", "en"];

function url(path: string): string {
  return `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/es", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/en", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/es/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/en/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/es/journey", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/en/journey", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/es/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/en/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/es/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/en/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/es/certifications", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/en/certifications", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/es/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/en/contact", priority: 0.7, changeFrequency: "yearly" as const },
  ];

  // Dynamic blog posts
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: url(`/${locale}/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Dynamic project pages
  const projects = getAllProjects();
  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: url(`/${locale}/projects/${project.slug}`),
      lastModified: new Date(project.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: url(path),
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...blogEntries,
    ...projectEntries,
  ];
}
