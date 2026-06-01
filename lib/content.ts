export type Locale = "es" | "en";

export type PowerSkill =
  | "critical-thinking"
  | "creative-thinking"
  | "communication"
  | "collaboration";

export type Project = {
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
  problem: Record<Locale, string>;
  process: Record<Locale, string[]>;
  outcomes: Record<Locale, string[]>;
  lessons: Record<Locale, string[]>;
  repository?: string;
  demo?: string;
};

export type JourneyMilestone = {
  year: string;
  institution : string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  skills: string[];
  gallery: Array<{
    src: string;
    alt: Record<Locale, string>;
  }>;
  relatedProjects?: string[];
};

export const powerSkillLabels: Record<PowerSkill, Record<Locale, string>> = {
  "critical-thinking": {
    es: "Pensamiento critico",
    en: "Critical Thinking",
  },
  "creative-thinking": {
    es: "Pensamiento creativo",
    en: "Creative Thinking",
  },
  communication: {
    es: "Comunicacion efectiva",
    en: "Effective Communication",
  },
  collaboration: {
    es: "Colaboracion efectiva",
    en: "Effective Collaboration",
  },
};

export const projects: Project[] = [
  {
    slug: "engineering-journey-platform",
    title: {
      es: "Engineering Journey Platform",
      en: "Engineering Journey Platform",
    },
    summary: {
      es: "Sistema publico para documentar proyectos, aprendizajes, logros y crecimiento tecnico durante la carrera.",
      en: "A public system for documenting projects, learning, achievements, and technical growth across the degree.",
    },
    date: "2026-05-31",
    status: {
      es: "En desarrollo",
      en: "In progress",
    },
    stage: {
      es: "Phase 2",
      en: "Phase 2",
    },
    featured: true,
    tags: ["software-engineering", "documentation", "full-stack"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl"],
    powerSkills: ["critical-thinking", "communication"],
    problem: {
      es: "Un portafolio tradicional no captura el proceso de crecimiento de varios anios, ni conecta proyectos con reflexiones, competencias y evidencia.",
      en: "A traditional portfolio does not capture a multi-year growth process or connect projects with reflections, competencies, and evidence.",
    },
    process: {
      es: [
        "Definir una arquitectura simple basada en rutas localizadas.",
        "Crear un sistema visual limpio, con tema claro y oscuro desde el MVP.",
        "Separar contenido inicial en estructuras tipadas para poder migrarlo a MDX despues.",
      ],
      en: [
        "Define a simple architecture based on localized routes.",
        "Create a clean visual system with light and dark theme support from the MVP.",
        "Keep initial content in typed structures so it can move into MDX later.",
      ],
    },
    outcomes: {
      es: [
        "Base bilingue para Home, Journey y Projects.",
        "Navegacion global, footer, tema e idioma funcionando.",
        "Primer caso de estudio para documentar el propio sistema.",
      ],
      en: [
        "Bilingual foundation for Home, Journey, and Projects.",
        "Working global navigation, footer, theme, and language controls.",
        "First case study documenting the platform itself.",
      ],
    },
    lessons: {
      es: [
        "La documentacion debe ser parte del producto, no una tarea posterior.",
        "Una estructura simple es mas facil de mantener durante varios anios.",
      ],
      en: [
        "Documentation should be part of the product, not an afterthought.",
        "A simple structure is easier to maintain across several years.",
      ],
    },
  },
  {
    slug: "key-institute-pbl-archive",
    title: {
      es: "Archivo PBL de Key Institute",
      en: "Key Institute PBL Archive",
    },
    summary: {
      es: "Concepto de archivo para preservar experiencias de aprendizaje basado en proyectos, Key Weeks y presentaciones.",
      en: "Archive concept for preserving project-based learning experiences, Key Weeks, and presentations.",
    },
    date: "2026-05-20",
    status: {
      es: "Concepto",
      en: "Concept",
    },
    stage: {
      es: "Planeacion",
      en: "Planning",
    },
    featured: true,
    tags: ["key-week", "research", "communication"],
    technologies: ["Content Strategy", "Information Architecture"],
    powerSkills: ["creative-thinking", "collaboration", "communication"],
    problem: {
      es: "Las experiencias intensivas de aprendizaje pierden contexto si solo quedan como fotos o publicaciones aisladas.",
      en: "Intensive learning experiences lose context when they only remain as photos or isolated posts.",
    },
    process: {
      es: [
        "Identificar que informacion debe conservarse de cada experiencia.",
        "Relacionar eventos con proyectos, articulos y logros.",
        "Definir una estructura que pueda crecer sin depender de una base de datos.",
      ],
      en: [
        "Identify which information should be preserved for each experience.",
        "Connect events with projects, articles, and achievements.",
        "Define a structure that can grow without depending on a database.",
      ],
    },
    outcomes: {
      es: [
        "Modelo inicial de contenido para futuras entradas de Key Week.",
        "Primeras relaciones entre timeline, proyectos y reflexiones.",
      ],
      en: [
        "Initial content model for future Key Week entries.",
        "Early relationships between timeline, projects, and reflections.",
      ],
    },
    lessons: {
      es: [
        "El contexto vuelve mas valiosa la evidencia.",
        "Los aprendizajes colaborativos necesitan registrar roles, decisiones y resultados.",
      ],
      en: [
        "Context makes evidence more valuable.",
        "Collaborative learning should record roles, decisions, and outcomes.",
      ],
    },
  },
  {
    slug: "technical-growth-map",
    title: {
      es: "Mapa de crecimiento tecnico",
      en: "Technical Growth Map",
    },
    summary: {
      es: "Exploracion visual para conectar cursos, habilidades, proyectos y competencias de ingenieria.",
      en: "Visual exploration for connecting courses, skills, projects, and engineering competencies.",
    },
    date: "2026-05-10",
    status: {
      es: "Exploracion",
      en: "Exploration",
    },
    stage: {
      es: "Futuro modulo",
      en: "Future module",
    },
    featured: false,
    tags: ["systems-design", "curriculum", "engineering"],
    technologies: ["Data Modeling", "UX Design"],
    powerSkills: ["critical-thinking", "creative-thinking"],
    problem: {
      es: "El progreso academico suele verse como una lista de materias, no como un sistema de conocimiento conectado.",
      en: "Academic progress is often seen as a list of courses instead of a connected knowledge system.",
    },
    process: {
      es: [
        "Organizar etapas curriculares por areas de aprendizaje.",
        "Explorar relaciones simples entre cursos, proyectos y competencias.",
        "Evitar complejidad prematura hasta tener mas contenido real.",
      ],
      en: [
        "Organize curriculum stages by learning areas.",
        "Explore simple relationships between courses, projects, and competencies.",
        "Avoid premature complexity until more real content exists.",
      ],
    },
    outcomes: {
      es: [
        "Direccion inicial para el futuro Curriculum Explorer.",
        "Vocabulario comun para hablar de habilidades y areas tecnicas.",
      ],
      en: [
        "Initial direction for the future Curriculum Explorer.",
        "Shared vocabulary for skills and technical areas.",
      ],
    },
    lessons: {
      es: [
        "Un mapa educativo debe explicar evolucion, no solo clasificar informacion.",
        "Las relaciones deben mantenerse humanas y faciles de editar.",
      ],
      en: [
        "An education map should explain evolution, not only classify information.",
        "Relationships should remain human and easy to edit.",
      ],
    },
  },
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    institution: "Key Institute",
    year: "2026 - actualmente",
    title: {
      es: "Ingeniería en Ciencias de la Computacion Integradas",
      en: "Project-based engineering",
    },
    description: {
      es: "La carrera en Ingeniería en Ciencias de la Computación conecta teoría, proyectos, colaboración y pensamiento lógico.",
      en: "Engineering in Integrated Computer Science connects theory, projects, collaboration, and constant reflection.",
    },
    skills: ["Pensamiento Crítico", "Ingeniería", "Liderazgo", "Pensamiento Creativo", "Colaboración Efectiva", "Comunicación Efectiva", "Project Based Learning"],
    gallery: [
      {
        src: "/keyinstitute/key-logo.png",
        alt: {
          es: "Imagen principal de Key Institute",
          en: "Main image of Key Institute stage",
        },
      },
      {
        src: "/keyinstitute/fachada.jpg",
        alt: {
          es: "Fachada de Key Institute",
          en: "Front of Key Institute",
        },
      },
      {
        src: "/keyinstitute/do-engineer.jpg",
        alt: {
          es: "Do engineer, el lema de Key Institute",
          en: "Do engineer, Key Institute's motto",
        },
      },
      {
        src: "/keyinstitute/group.jpg",
        alt: {
          es: "Trabajo en equipo, parte fundamental de la experiencia en Key Institute",
          en: "Teamwork, a fundamental part of the experience at Key Institute",
        },
      },
      {
        src: "/keyinstitute/group-2.jpg",
        alt: {
          es: "Trabajo en equipo, parte fundamental de la experiencia en Key Institute",
          en: "Teamwork, a fundamental part of the experience at Key Institute",
        },
      },
      {
        src: "/keyinstitute/carlos-vela.jpg",
        alt: {
          es: "Carlos Vela, creador de STEM",
          en: "Carlos Vela, creator of STEM",
        },
      },
            {
        src: "/keyinstitute/tere.jpg",
        alt: {
          es: "Tere, proyecto de emprendimiento en key institute",
          en: "Tere, entrepreneurship project at Key Institute",
        },
      },
    ],
    relatedProjects: ["engineering-journey-platform", "key-institute-pbl-archive"],
  },
  {
    institution: "Programa Oportunidades",
    year: "2022 - 2024",
    title: {
      es: "Disciplina, comunicacion y proposito",
      en: "Discipline, communication, and purpose",
    },
    description: {
      es: "La beca fortalecio habilidades personales, ingles, liderazgo y preparacion para oportunidades academicas y profesionales.",
      en: "The scholarship strengthened personal skills, English, leadership, and preparation for academic and professional opportunities.",
    },
    skills: ["liderazgo", "ingles", "comunicacion"],
    gallery: [
      {
        src: "/josueduardev.png",
        alt: {
          es: "Imagen temporal para Programa Oportunidades",
          en: "Temporary image for Programa Oportunidades",
        },
      },
      {
        src: "/josueduardev.svg",
        alt: {
          es: "Marca personal como evidencia temporal",
          en: "Personal brand used as temporary evidence",
        },
      },
      {
        src: "/computer-science-logo.svg",
        alt: {
          es: "Simbolo tecnico complementario",
          en: "Complementary technical symbol",
        },
      },
    ],
  },
  {
    institution: "Formacion tecnica",
    year: "2024 - 2026",
    title: {
      es: "Software y fundamentos de computacion",
      en: "Software and computing foundations",
    },
    description: {
      es: "La formacion tecnica ayudo a convertir interes en practica: programacion, resolucion de problemas y primeros proyectos.",
      en: "Technical training helped turn interest into practice through programming, problem solving, and early projects.",
    },
    skills: ["programacion", "logica", "bases tecnicas"],
    gallery: [
      {
        src: "/computer-science-logo.svg",
        alt: {
          es: "Simbolo de formacion tecnica en computacion",
          en: "Symbol for technical computing education",
        },
      },
      {
        src: "/josueduardev.png",
        alt: {
          es: "Imagen temporal de desarrollo personal",
          en: "Temporary image for personal development",
        },
      },
      {
        src: "/josueduardev.svg",
        alt: {
          es: "Identidad grafica temporal",
          en: "Temporary graphic identity",
        },
      },
    ],
  },
  {
    institution: "Infancia",
    year: "2018 - 2019",
    title: {
      es: "Primer contacto con tecnologia",
      en: "First contact with technology",
    },
    description: {
      es: "La curiosidad por computadoras, diseno y herramientas digitales comenzo temprano y formo una base creativa para aprender tecnologia.",
      en: "Early curiosity for computers, design, and digital tools built a creative foundation for learning technology.",
    },
    skills: ["curiosidad", "diseno grafico", "aprendizaje autonomo"],
    gallery: [
      {
        src: "/josueduardev.svg",
        alt: {
          es: "Imagen temporal para el primer contacto con tecnologia",
          en: "Temporary image for first contact with technology",
        },
      },
      {
        src: "/computer-science-logo.svg",
        alt: {
          es: "Simbolo de aprendizaje temprano",
          en: "Early learning symbol",
        },
      },
      {
        src: "/josueduardev.png",
        alt: {
          es: "Retrato temporal de contexto personal",
          en: "Temporary portrait for personal context",
        },
      },
    ],
  },
];

export function getLocaleValue<T>(value: Record<Locale, T>, locale: string): T {
  return value[locale === "en" ? "en" : "es"];
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
