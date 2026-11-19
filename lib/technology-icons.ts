type TechnologyIcon = {
  src: string;
  darkSrc?: string;
  darkBackground?: boolean;
  monochrome?: boolean;
};

export const technologyIcons: Record<string, TechnologyIcon> = {
  "Next.js": { src: "/stack/frontend/nextjs.svg", monochrome: true },
  TypeScript: { src: "/stack/frontend/typescript.svg" },
  Astro: { src: "/stack/frontend/astro.svg" },
  Python: { src: "/stack/backend/python.svg" },
  FastAPI: { src: "/stack/backend/fastapi.svg" },
  Prisma: { src: "/stack/backend/prisma.svg", monochrome: true },
  PostgreSQL: { src: "/stack/backend/postgresql.svg" },
  Supabase: { src: "/stack/backend/supabase.svg" },
  Gemini: { src: "/stack/ai/gemini.svg" },
  "WhatsApp API": { src: "/stack/integrations/whatsapp.svg" },
  React: { src: "/stack/frontend/React_light.svg", darkSrc: "/stack/frontend/React_dark.svg" },
  Vite: { src: "/stack/frontend/vite.svg" },
  "Tailwind CSS": { src: "/stack/frontend/tailwindcss.svg" },
  JavaScript: { src: "/stack/frontend/javascript.svg" },
  "Chrome Extensions": { src: "/stack/integrations/chrome.svg" },
  "SAP Business One": { src: "/stack/integrations/sap.svg" },
  "Service Layer": { src: "/stack/integrations/sap.svg" },
  "Spring Boot": { src: "/stack/backend/spring.svg" },
  GCP: { src: "/stack/tools/google-cloud.svg" },
  Medallia: { src: "/stack/integrations/medallia.png", darkBackground: true },
  Quarkus: { src: "/stack/backend/quarkus.svg" },
  "Apache Kafka": { src: "/stack/backend/kafka.svg", monochrome: true },
  "Angular 17": { src: "/stack/frontend/angular.svg" },
  Laravel: { src: "/stack/backend/laravel.svg" },
};
