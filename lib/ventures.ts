import type { Locale } from "@/lib/content";
import type { ProjectGalleryImage } from "@/lib/project-gallery";

type Venture = {
  id: string;
  name: string;
  url: string;
  logo: string;
  category: Record<Locale, string>;
  description: Record<Locale, string>;
  technologies: string[];
  highlights: Record<Locale, string[]>;
  gallery: ProjectGalleryImage[];
};

// Reviewed against the four local repositories and their public websites.
// Screenshots show public pages and demos, captured on November 19, 2026.
export const ventures: Venture[] = [
  {
    id: "focuminds",
    name: "FocuMinds",
    url: "https://focuminds.com/",
    logo: "/ventures/focuminds.png",
    category: { es: "Planificación académica", en: "Academic planning" },
    description: {
      es: "Planificador para estudiantes que conecta materias, proyectos y calendario para saber qué hacer hoy y evitar la sobrecarga.",
      en: "A student planner that connects subjects, projects, and calendars to clarify today's priorities and prevent overload.",
    },
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Gemini"],
    highlights: {
      es: [
        "Motor determinista para calcular cuándo empezar, el margen de entrega y la capacidad semanal.",
        "Gestión de materias, notas, pensum, proyectos y hábitos en una misma plataforma.",
        "Importación de pensum y planes de evaluación desde PDF o imágenes con Gemini.",
      ],
      en: [
        "A deterministic engine that calculates start dates, deadline margins, and weekly capacity.",
        "Subjects, grades, curricula, projects, and habits managed in one platform.",
        "Curriculum and assessment plan imports from PDFs or images using Gemini.",
      ],
    },
    gallery: [
      {
        src: "/projects/ventures/focuminds-home.jpg",
        alt: {
          es: "Página de inicio de FocuMinds con su propuesta de planificación del semestre.",
          en: "FocuMinds homepage presenting its semester planning tools.",
        },
        caption: { es: "FocuMinds · Página de inicio", en: "FocuMinds · Homepage" },
      },
      {
        src: "/projects/ventures/focuminds-capacity.jpg",
        alt: {
          es: "Demo pública del simulador de capacidad de FocuMinds con compromisos y horas disponibles.",
          en: "FocuMinds public capacity simulator demo with commitments and available hours.",
        },
        caption: { es: "Demo pública · Simulador de capacidad", en: "Public demo · Capacity simulator" },
      },
    ],
  },
  {
    id: "spotmi",
    name: "Spotmi",
    url: "https://spotmi.com.sv/",
    logo: "/ventures/spotmi.png",
    category: { es: "Turismo y negocios locales", en: "Tourism and local businesses" },
    description: {
      es: "Guía digital de El Salvador que conecta a turistas con lugares, eventos y negocios locales mediante búsquedas y mapas.",
      en: "A digital guide to El Salvador connecting travelers with places, events, and local businesses through search and maps.",
    },
    technologies: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Gemini"],
    highlights: {
      es: [
        "Directorio bilingüe con lugares, eventos y proveedores del Registro Nacional de Turismo.",
        "Exploración con Google Maps, filtros por categoría y departamento, y fichas públicas para buscadores.",
        "Paneles para turistas y negocios, y un asistente con Gemini que consulta información real del directorio.",
      ],
      en: [
        "A bilingual directory of places, events, and providers from the National Tourism Registry.",
        "Google Maps exploration, category and department filters, and search-friendly public listings.",
        "Traveler and business dashboards, plus a Gemini assistant grounded in real directory data.",
      ],
    },
    gallery: [
      {
        src: "/projects/ventures/spotmi-home.jpg",
        alt: {
          es: "Página de inicio de Spotmi con buscador y acceso a lugares, eventos, negocios y destinos.",
          en: "Spotmi homepage with search and links to places, events, businesses, and destinations.",
        },
        caption: { es: "Spotmi · Descubrir El Salvador", en: "Spotmi · Discover El Salvador" },
      },
      {
        src: "/projects/ventures/spotmi-explore.jpg",
        alt: {
          es: "Explorador de Spotmi con mapa de El Salvador, filtros y fichas de lugares turísticos.",
          en: "Spotmi explorer with an El Salvador map, filters, and tourist attraction listings.",
        },
        caption: { es: "Spotmi · Mapa y exploración de lugares", en: "Spotmi · Map and place explorer" },
      },
    ],
  },
  {
    id: "telmoney",
    name: "TelMoney",
    url: "https://telmoney.app/",
    logo: "/ventures/telmoney.svg",
    category: { es: "Finanzas personales por WhatsApp", en: "Personal finance on WhatsApp" },
    description: {
      es: "Asistente de finanzas personales por WhatsApp para registrar movimientos, controlar gastos y planificar metas de ahorro.",
      en: "A personal finance assistant on WhatsApp for logging transactions, tracking spending, and planning savings goals.",
    },
    technologies: ["Astro", "Python", "FastAPI", "PostgreSQL", "WhatsApp API", "Gemini"],
    highlights: {
      es: [
        "Bot integrado con WhatsApp Cloud API que interpreta mensajes, notas de voz y recibos con IA.",
        "Control de cuentas, presupuestos, deudas y metas de ahorro, con reportes en Excel y PDF.",
        "Web comercial y panel de administración conectados al backend del bot.",
      ],
      en: [
        "A WhatsApp Cloud API bot that interprets messages, voice notes, and receipts with AI.",
        "Account, budget, debt, and savings tracking, with Excel and PDF reports.",
        "A product website and administration dashboard connected to the bot backend.",
      ],
    },
    gallery: [
      {
        src: "/projects/ventures/telmoney-home.jpg",
        alt: {
          es: "Página de TelMoney con demostración de registro de gastos mediante una conversación de WhatsApp.",
          en: "TelMoney homepage demonstrating expense logging through a WhatsApp conversation.",
        },
        caption: { es: "TelMoney · Web y demo de conversación", en: "TelMoney · Website and conversation demo" },
      },
      {
        src: "/projects/ventures/telmoney-budget.jpg",
        alt: {
          es: "Simulador público de TelMoney con cálculo del disponible diario y comparación de una compra.",
          en: "TelMoney public simulator calculating daily spending capacity and a purchase scenario.",
        },
        caption: { es: "Demo pública · Disponible diario", en: "Public demo · Daily spending capacity" },
      },
    ],
  },
];
