import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale, PowerSkill } from "@/lib/content";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectMeta = {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  date: string;
  status: Record<Locale, string>;
  stage: Record<Locale, string>;
  featured: boolean;
  tags: string[];
  technologies: string[];
  powerSkills: PowerSkill[];
  repository?: string;
  demo?: string;
  coverImage?: string;
};

function ensureDir() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  }
}

function parseProjectFile(file: string): ProjectMeta {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data } = matter(raw);
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title as Record<Locale, string>,
    summary: data.summary as Record<Locale, string>,
    date: data.date as string,
    status: data.status as Record<Locale, string>,
    stage: data.stage as Record<Locale, string>,
    featured: (data.featured as boolean) ?? false,
    tags: (data.tags as string[]) ?? [],
    technologies: (data.technologies as string[]) ?? [],
    powerSkills: (data.powerSkills as PowerSkill[]) ?? [],
    repository: data.repository as string | undefined,
    demo: data.demo as string | undefined,
    coverImage: data.coverImage as string | undefined,
  };
}

export function getAllProjects(): ProjectMeta[] {
  ensureDir();
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseProjectFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectMeta(slug: string): ProjectMeta | null {
  const filepath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  return parseProjectFile(`${slug}.mdx`);
}
