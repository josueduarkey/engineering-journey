import type { Locale } from "@/lib/content";

export type StackEntry = {
  name: string;
  lightSrc: string;
  darkSrc?: string;
};

export type StackCategory = {
  id: string;
  label: Record<Locale, string>;
  items: StackEntry[];
};

export const techStack: StackCategory[] = [
  {
    id: "frontend",
    label: { es: "Frontend", en: "Frontend" },
    items: [
      { name: "HTML5", lightSrc: "/stack/frontend/html5.svg" },
      { name: "CSS3", lightSrc: "/stack/frontend/css.svg" },
      { name: "JavaScript", lightSrc: "/stack/frontend/javascript.svg" },
      { name: "Bootstrap", lightSrc: "/stack/frontend/bootstrap.svg" },
      { name: "React", lightSrc: "/stack/frontend/React_light.svg", darkSrc: "/stack/frontend/React_dark.svg" },
      { name: "Tailwind CSS", lightSrc: "/stack/frontend/tailwindcss.svg" },
      { name: "Next.js", lightSrc: "/stack/frontend/Next.js_wordmark_light.svg", darkSrc: "/stack/frontend/Next.js_wordmark_dark.svg" },
      { name: "TypeScript", lightSrc: "/stack/frontend/typescript.svg" },
    ],
  },
  {
    id: "backend",
    label: { es: "Backend", en: "Backend" },
    items: [
      { name: "Node.js", lightSrc: "/stack/backend/nodejs.svg" },
      { name: "Express.js", lightSrc: "/stack/backend/Express.js_light.svg", darkSrc: "/stack/backend/Express.js_dark.svg" },
      { name: "MySQL", lightSrc: "/stack/backend/MySQL_light.svg", darkSrc: "/stack/backend/MySQL_dark.svg" },
      { name: "PostgreSQL", lightSrc: "/stack/backend/postgresql.svg" },
      { name: "Spring Boot", lightSrc: "/stack/backend/spring.svg" },
    ],
  },
  {
    id: "tools",
    label: { es: "Herramientas", en: "Tools" },
    items: [
      { name: "Git", lightSrc: "/stack/tools/git.svg" },
      { name: "GitHub", lightSrc: "/stack/tools/GitHub_light.svg", darkSrc: "/stack/tools/GitHub_dark.svg" },
      { name: "Docker", lightSrc: "/stack/tools/docker.svg" },
      { name: "Figma", lightSrc: "/stack/tools/figma.svg" },
      { name: "Postman", lightSrc: "/stack/tools/postman.svg" },
      { name: "VS Code", lightSrc: "/stack/tools/vscode.svg" },
      { name: "Linux", lightSrc: "/stack/tools/linux.svg" },
      { name: "Google Cloud", lightSrc: "/stack/tools/google-cloud.svg" },
    ],
  },
  {
    id: "ai",
    label: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    items: [
      { name: "Claude AI", lightSrc: "/stack/ai/claude-ai-icon.svg" },
      { name: "Codex", lightSrc: "/stack/ai/Codex_light.svg", darkSrc: "/stack/ai/Codex_dark.svg" },
      { name: "Cursor", lightSrc: "/stack/tools/Cursor_light.svg", darkSrc: "/stack/tools/Cursor_dark.svg" },
      { name: "Antigravity", lightSrc: "/stack/ai/antigravity.svg" },
      { name: "GitHub Copilot", lightSrc: "/stack/ai/GitHub Copilot_light.svg", darkSrc: "/stack/ai/GitHub Copilot_dark.svg" },
    ],
  },
];
