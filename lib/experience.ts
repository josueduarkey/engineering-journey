import type { Locale } from "@/lib/content";
import type { ProjectGalleryImage } from "@/lib/project-gallery";

type Experience = {
  id: string;
  company: string;
  companyUrl: string;
  initials: string;
  logo?: string;
  technologies: string[];
  role: Record<Locale, string>;
  current?: boolean;
  employmentType?: Record<Locale, string>;
  workMode?: Record<Locale, string>;
  startDate: string;
  period: Record<Locale, string>;
  location: string;
  projectTitle: Record<Locale, string>;
  projectSummary: Record<Locale, string>;
  projectReference?: {
    href: string;
    label: Record<Locale, string>;
  };
  gallery: ProjectGalleryImage[];
  highlights: Record<Locale, string[]>;
};

// Current reference: public/Josue-Garcia-CV.pdf. Clobi is retained from the earlier CV.
// Josué confirmed the ongoing hybrid internship and DATASOFT technologies separately.
// Specific duties and project captures are confirmed directly by Josué.
export const experiences: Experience[] = [
  {
    id: "impresos-multiples",
    company: "Impresos Múltiples S.A. de C.V.",
    companyUrl: "https://www.impresosm.com/",
    initials: "IM",
    logo: "/companies/impresos-multiples.png",
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript", "Chrome Extensions", "SAP Business One", "Service Layer"],
    role: { es: "Desarrollador Frontend", en: "Frontend Developer" },
    current: true,
    employmentType: { es: "Pasantía", en: "Internship" },
    workMode: { es: "Híbrido", en: "Hybrid" },
    startDate: "2026-06",
    period: { es: "Jun 2026 – presente", en: "Jun 2026 – present" },
    location: "La Libertad",
    projectTitle: { es: "NEXO e integración de facturas con SAP", en: "NEXO and invoice integration with SAP" },
    projectSummary: {
      es: "Módulo de incidencias para NEXO y captura de facturas por QR integrada con SAP Business One.",
      en: "Incident reporting for NEXO and QR-based invoice capture integrated with SAP Business One.",
    },
    gallery: [],
    highlights: {
      es: [
        "Desarrollé el módulo de rechazos y reclamos de NEXO para pedidos y órdenes de fabricación (OF).",
        "Reduje la notificación de incidencias de 4 días a unos clics.",
        "Creé una extensión de Chrome que extrae encabezados de facturas de Hacienda por QR y reduce errores contables.",
        "Integré el lector QR con SAP Business One vía Service Layer, agilizando el registro de facturas por proveedor.",
      ],
      en: [
        "Built NEXO's rejection and claims module for customer and manufacturing orders (OF).",
        "Reduced incident notification from 4 days to a few clicks.",
        "Built a Chrome extension to extract Hacienda invoice headers via QR and reduce accounting entry errors.",
        "Integrated QR scanning with SAP Business One via Service Layer to streamline supplier invoice entry.",
      ],
    },
  },
  {
    id: "datasoft",
    company: "DATASOFT S.A. DE C.V.",
    companyUrl: "https://www.dsdev.net/",
    initials: "DS",
    logo: "/companies/datasoft.png",
    technologies: ["Spring Boot", "GCP", "Medallia", "Quarkus", "Apache Kafka"],
    role: { es: "FullStack Developer Jr.", en: "FullStack Developer Jr." },
    startDate: "2025-11",
    period: { es: "Nov 2025 – Ene 2026", en: "Nov 2025 – Jan 2026" },
    location: "San Salvador",
    projectTitle: { es: "Comisiones regionales para SIMAN y Customer Experience", en: "Regional commissions for SIMAN and Customer Experience" },
    projectSummary: {
      es: "Colaboración en la gestión regional de comisiones de SIMAN y en una plataforma de Customer Experience.",
      en: "Contributions to SIMAN's regional commission management and a Customer Experience platform.",
    },
    gallery: [],
    highlights: {
      es: [
        "Apoyé el desarrollo de un sistema regional de SIMAN para calcular comisiones por empleado.",
        "Colaboré en un sistema de Customer Experience con Quarkus, Kafka y la API de Medallia.",
        "Participé en la planificación y el seguimiento de tareas bajo Scrum.",
      ],
      en: [
        "Supported SIMAN's regional commission system, calculating commissions per employee.",
        "Contributed to a Customer Experience system using Quarkus, Kafka, and the Medallia API.",
        "Participated in Scrum planning and task tracking.",
      ],
    },
  },
  {
    id: "clobi",
    company: "Clobi Technologies",
    companyUrl: "https://clobitech.com/",
    initials: "CT",
    logo: "/companies/clobi.svg",
    technologies: ["Angular 17", "Laravel", "JavaScript", "APIs REST"],
    role: { es: "Junior Web Developer", en: "Junior Web Developer" },
    startDate: "2025-07",
    period: { es: "Jul 2025 – Oct 2025", en: "Jul 2025 – Oct 2025" },
    location: "San Salvador",
    projectTitle: { es: "Synergy Financial y auditorías para Super Repuestos", en: "Synergy Financial and Super Repuestos branch audits" },
    projectSummary: {
      es: "Interfaces para la plataforma de factoraje de Synergy Financial y un sistema de auditorías de sucursales para Super Repuestos.",
      en: "Interfaces for Synergy Financial's factoring platform and a branch audit system for Super Repuestos.",
    },
    projectReference: {
      href: "https://clobitech.com/proyectos/express-pay/",
      label: { es: "Ver caso de Synergy en Clobi", en: "View Synergy's case study at Clobi" },
    },
    gallery: [
      {
        src: "/projects/clobi/synergy-login.png",
        alt: {
          es: "Pantalla de inicio de sesión del sistema de pronto pago a proveedores de Synergy Financial.",
          en: "Login screen for Synergy Financial's supplier early payment system.",
        },
        caption: {
          es: "Synergy Financial · Inicio de sesión",
          en: "Synergy Financial · Login",
        },
      },
      {
        src: "/synergy.webp",
        alt: {
          es: "Panel de solicitudes de factoraje y vista de cesión de Synergy Financial.",
          en: "Synergy Financial's factoring request dashboard and assignment details.",
        },
        caption: {
          es: "Synergy Financial · Gestión de solicitudes de factoraje",
          en: "Synergy Financial · Factoring request management",
        },
      },
      {
        src: "/projects/clobi/super-repuestos-auditoria.png",
        alt: {
          es: "Formulario de inspección de visita a sucursal de Super Repuestos.",
          en: "Super Repuestos branch inspection form.",
        },
        caption: {
          es: "Super Repuestos · Auditoría de sucursales",
          en: "Super Repuestos · Branch audits",
        },
      },
    ],
    highlights: {
      es: [
        "Desarrollé interfaces responsivas con Angular 17 para la plataforma de factoraje de Synergy Financial.",
        "Implementé componentes reutilizables para mejorar el rendimiento y la experiencia de usuario.",
        "Integré APIs REST en los flujos de la plataforma financiera.",
        "Desarrollé un sistema de auditorías para sucursales de Super Repuestos con formularios de inspección.",
      ],
      en: [
        "Built responsive Angular 17 interfaces for Synergy Financial's factoring platform.",
        "Created reusable components to improve performance and user experience.",
        "Integrated REST APIs into the financial platform's workflows.",
        "Developed a branch audit system for Super Repuestos with inspection forms.",
      ],
    },
  },
];
