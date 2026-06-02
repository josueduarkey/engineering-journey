export type Locale = "es" | "en";

export type PowerSkill =
  | "critical-thinking"
  | "creative-thinking"
  | "communication"
  | "collaboration";

export type JourneyMilestone = {
  year: Record<Locale, string>;
  institution: Record<Locale, string>;
  link?: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  skills: string[];
  gallery: Array<{
    src: string;
    alt: Record<Locale, string>;
  }>;
  relatedProjects?: string[];
  projectsHref?: string;
};

export type ProjectGroup = {
  anchor: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  slugs: string[];
};

export const powerSkillLabels: Record<PowerSkill, Record<Locale, string>> = {
  "critical-thinking": { es: "Pensamiento crítico", en: "Critical Thinking" },
  "creative-thinking": { es: "Pensamiento creativo", en: "Creative Thinking" },
  communication: { es: "Comunicación efectiva", en: "Effective Communication" },
  collaboration: { es: "Colaboración efectiva", en: "Effective Collaboration" },
};

// ─── Project groups (for the /projects page sections) ─────────────────────────
export const projectGroups: ProjectGroup[] = [
  {
    anchor: "keyinstitute",
    title: { es: "Key Institute", en: "Key Institute" },
    description: {
      es: "Proyectos desarrollados durante la carrera en Ingeniería en Ciencias de la Computación Integradas.",
      en: "Projects developed during the Engineering in Integrated Computer Science degree.",
    },
    slugs: ["engineering-journey-platform", "key-institute-pbl-archive", "technical-growth-map"],
  },
  {
    anchor: "udb",
    title: { es: "Universidad Don Bosco", en: "Universidad Don Bosco" },
    description: {
      es: "Proyectos del Técnico en Ingeniería en Computación.",
      en: "Projects from the Technical Degree in Computer Engineering.",
    },
    slugs: [],
  },
  {
    anchor: "oportunidades",
    title: { es: "Programa Oportunidades", en: "Programa Oportunidades" },
    description: {
      es: "Proyectos y logros desarrollados durante el programa de fortalecimiento académico.",
      en: "Projects and achievements developed during the academic strengthening program.",
    },
    slugs: [],
  },
  {
    anchor: "ina",
    title: { es: "Instituto Nacional de Aguilares", en: "Instituto Nacional de Aguilares" },
    description: {
      es: "Proyectos y trabajos del bachillerato en Ciencias y Letras.",
      en: "Projects and work from the high school diploma in Science and Arts.",
    },
    slugs: [],
  },
  {
    anchor: "infancia",
    title: { es: "Infancia", en: "Childhood" },
    description: {
      es: "Primeros proyectos de exploración digital y curiosidad creativa.",
      en: "First digital exploration projects and creative curiosity.",
    },
    slugs: [],
  },
];

// ─── Journey milestones (newest → oldest) ─────────────────────────────────────
export const journeyMilestones: JourneyMilestone[] = [
  {
    institution: { es: "Key Institute", en: "Key Institute" },
    year: { es: "Enero 2026 - presente", en: "January 2026 - present" },
    link: "https://keyinstitute.com/",
    title: {
      es: "Ingeniería en Ciencias de la Computación Integradas",
      en: "Engineering in Integrated Computer Science",
    },
    description: {
      es: "La carrera conecta teoría, proyectos, colaboración y reflexión continua a través de una metodología basada en proyectos reales.",
      en: "The degree connects theory, projects, collaboration, and continuous reflection through a project-based learning methodology.",
    },
    skills: ["Pensamiento Crítico", "Ingeniería", "Liderazgo", "Pensamiento Creativo", "Colaboración Efectiva", "Comunicación Efectiva", "Project Based Learning"],
    gallery: [
      { src: "/keyinstitute/key-logo.png", alt: { es: "Logo de Key Institute", en: "Key Institute logo" } },
      { src: "/keyinstitute/fachada.jpg", alt: { es: "Fachada de Key Institute", en: "Front of Key Institute" } },
      { src: "/keyinstitute/do-engineer.jpg", alt: { es: "Do Engineer, el lema de Key Institute", en: "Do Engineer, Key Institute's motto" } },
      { src: "/keyinstitute/group.jpg", alt: { es: "Trabajo en equipo en Key Institute", en: "Teamwork at Key Institute" } },
      { src: "/keyinstitute/group-2.jpg", alt: { es: "Colaboración en Key Institute", en: "Collaboration at Key Institute" } },
      { src: "/keyinstitute/carlos-vela.jpg", alt: { es: "Carlos Vela, creador del modelo STEM en Key Institute", en: "Carlos Vela, creator of the STEM model at Key Institute" } },
      { src: "/keyinstitute/tere.jpg", alt: { es: "Tere, proyecto de emprendimiento en Key Institute", en: "Tere, entrepreneurship project at Key Institute" } },
    ],
    relatedProjects: ["engineering-journey-platform", "key-institute-pbl-archive"],
    projectsHref: "/projects#keyinstitute",
  },
  {
    institution: { es: "Universidad Don Bosco", en: "Universidad Don Bosco" },
    year: { es: "Enero 2024 - Junio 2026", en: "January 2024 - June 2026" },
    link: "https://www.udb.edu.sv/udb/",
    title: {
      es: "Técnico en Ingeniería en Computación",
      en: "Technical Degree in Computer Engineering",
    },
    description: {
      es: "Formación técnica que convirtió el interés en práctica: programación, resolución de problemas y primeros proyectos reales.",
      en: "Technical training that turned interest into practice: programming, problem solving, and first real projects.",
    },
    skills: ["Fundamentos de programación", "Trabajo en equipo", "Frontend", "Backend", "Bases de Datos", "Redes Informáticas", "Desarrollo Mobile", "Servidores"],
    gallery: [
      { src: "/udb/udb-logo.webp", alt: { es: "Logo de Universidad Don Bosco", en: "Universidad Don Bosco logo" } },
      { src: "/udb/labs.webp", alt: { es: "Laboratorios de la Universidad", en: "University computer labs" } },
      { src: "/udb/grupo.jpg", alt: { es: "Foto tomada en la Universidad", en: "Photo taken at the University" } },
    ],
    projectsHref: "/projects#udb",
  },
  {
    institution: { es: "Programa Oportunidades - FGK", en: "Programa Oportunidades - FGK" },
    year: { es: "Enero 2022 - Febrero 2024", en: "January 2022 - February 2024" },
    link: "https://www.oportunidades.org.sv/",
    title: {
      es: "Educación complementaria para beca universitaria",
      en: "Values, Gratitude, Perseverance, and Community",
    },
    description: {
      es: "Programa de fortalecimiento académico en computación, inglés, liderazgo, emprendimiento, orientación vocacional y habilidades blandas.",
      en: "Academic strengthening program covering computing, English, leadership, entrepreneurship, vocational guidance, and soft skills.",
    },
    skills: ["Liderazgo", "Inglés", "Comunicación"],
    gallery: [
      { src: "/opor/oportunidades-logo.png", alt: { es: "Imagen de Programa Oportunidades", en: "Programa Oportunidades image" } },
      { src: "/josueduardev.svg", alt: { es: "Marca personal como evidencia", en: "Personal brand as evidence" } },
      { src: "/computer-science-logo.svg", alt: { es: "Símbolo técnico", en: "Technical symbol" } },
    ],
    projectsHref: "/projects#oportunidades",
  },
  {
    institution: { es: "Instituto Nacional de Aguilares", en: "Instituto Nacional de Aguilares" },
    year: { es: "Enero 2022 - Febrero 2024", en: "January 2022 - February 2024" },
    link: "https://www.facebook.com/people/Instituto-Nacional-de-Aguilares-Oficial/100057503498813/",
    title: {
      es: "Bachillerato General con Diplomado en Desarrollo de Software",
      en: "High School with a Software Development Diploma",
    },
    description: {
      es: "Formación secundaria donde se construyeron las bases académicas y personales, mientras se descubría una vocación hacia la tecnología y el pensamiento lógico.",
      en: "Secondary education where academic and personal foundations were built, while discovering a vocation towards technology and logical thinking.",
    },
    skills: ["Matemáticas", "Ciencias", "Disciplina", "Autodidacta"],
    gallery: [
      { src: "/ina/logo-ina.jpg", alt: { es: "Imagen representativa del Instituto Nacional de Aguilares", en: "Representative image of Instituto Nacional de Aguilares" } },
      { src: "/computer-science-logo.svg", alt: { es: "Símbolo de aprendizaje técnico temprano", en: "Early technical learning symbol" } },
      { src: "/josueduardev.png", alt: { es: "Retrato de contexto del Instituto Nacional de Aguilares", en: "Context portrait from Instituto Nacional de Aguilares" } },
    ],
    projectsHref: "/projects#ina",
  },
  {
    institution: { es: "Infancia", en: "Childhood" },
    year: { es: "2018 - 2019", en: "2018 - 2019" },
    title: {
      es: "Primer contacto con tecnología",
      en: "First contact with technology",
    },
    description: {
      es: "La curiosidad por computadoras, diseño y herramientas digitales comenzó temprano y formó una base creativa para aprender tecnología.",
      en: "Early curiosity for computers, design, and digital tools built a creative foundation for learning technology.",
    },
    skills: ["Curiosidad", "Diseño Gráfico", "Aprendizaje Autónomo"],
    gallery: [
      { src: "/josueduardev.svg", alt: { es: "Imagen del primer contacto con tecnología", en: "Image of first contact with technology" } },
      { src: "/computer-science-logo.svg", alt: { es: "Símbolo de aprendizaje temprano", en: "Early learning symbol" } },
      { src: "/josueduardev.png", alt: { es: "Retrato de contexto personal", en: "Personal context portrait" } },
    ],
    projectsHref: "/projects#infancia",
  },
];

export function getLocaleValue<T>(value: Record<Locale, T>, locale: string): T {
  return value[locale === "en" ? "en" : "es"];
}
