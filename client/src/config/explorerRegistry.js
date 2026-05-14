import {
  IoBookOutline,
  IoDocumentOutline,
  IoDocumentTextOutline,
  IoFilmOutline,
  IoGlobeOutline,
  IoLocationOutline,
  IoOpenOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoShieldCheckmarkOutline,
  IoVideocamOutline,
} from "react-icons/io5";

// PDFs van en /public/documents/<nombre>.pdf
// Videos usan URLs de embed (YouTube, Vimeo, etc.)

const EXPLORER_REGISTRY = [
  {
    id: "informacion",
    label: "Información",
    items: [
      {
        id: "quienes-somos",
        label: "¿Quiénes Somos?",
        type: "app",
        appId: "quienes-somos",
        Icon: IoPeopleOutline,
      },
      {
        id: "historia-ismac",
        label: "Historia Ismac",
        type: "app",
        appId: "historia-ismac",
        Icon: IoBookOutline,
      },
      {
        id: "nosotros-ismac",
        label: "Nosotros Ismac",
        type: "app",
        appId: "nosotros-ismac",
        Icon: IoVideocamOutline,
      },
      {
        id: "ubicacion-ismac",
        label: "Ubicación Ismac",
        type: "app",
        appId: "ubicacion-ismac",
        Icon: IoLocationOutline,
      },
    ],
  },
  {
    id: "aplicaciones",
    label: "Aplicaciones",
    items: [
      {
        id: "dantesga",
        label: "Dantesga",
        type: "link",
        href: "https://dantesga.com",
        Icon: IoOpenOutline,
      },
    ],
  },
  {
    id: "producciones",
    label: "Producciones",
    items: [],
  },
  {
    id: "normativas",
    label: "Normativas",
    items: [
      {
        id: "loes",
        label: "LOES",
        type: "pdf",
        src: "/documents/loes.pdf",
        Icon: IoDocumentTextOutline,
      },
      {
        id: "reglamento-faltas",
        label: "Reglamento de Faltas y Sanciones",
        type: "pdf",
        src: "/documents/reglamento-faltas.pdf",
        Icon: IoDocumentTextOutline,
      },
      {
        id: "ley-organica",
        label: "Reglamento Ley Orgánica Superior",
        type: "pdf",
        src: "/documents/ley-organica.pdf",
        Icon: IoDocumentTextOutline,
      },
      {
        id: "constitucion",
        label: "Constitución de la República del Ecuador",
        type: "pdf",
        src: "/documents/constitucion.pdf",
        Icon: IoDocumentTextOutline,
      },
      {
        id: "reglamento-academico",
        label: "Reglamento Régimen Académico",
        type: "pdf",
        src: "/documents/reglamento-academico.pdf",
        Icon: IoSchoolOutline,
      },
      {
        id: "codigo-etica",
        label: "Código de Ética",
        type: "pdf",
        src: "/documents/codigo-etica.pdf",
        Icon: IoShieldCheckmarkOutline,
      },
      {
        id: "manual-interculturalidad",
        label: "Manual de Aplicación del Principio de Interculturalidad",
        type: "pdf",
        src: "/documents/manual-interculturalidad.pdf",
        Icon: IoGlobeOutline,
      },
      {
        id: "plan-igualdad",
        label: "Plan de Igualdad Ismac",
        type: "pdf",
        src: "/documents/plan-igualdad.pdf",
        Icon: IoRibbonOutline,
      },
    ],
  },
  {
    id: "rendicion-cuentas",
    label: "Rendición de Cuentas",
    items: [
      {
        id: "rendicion-2022",
        label: "2022",
        type: "video",
        src: "",
        Icon: IoFilmOutline,
      },
      {
        id: "rendicion-2023",
        label: "2023",
        type: "video",
        src: "",
        Icon: IoFilmOutline,
      },
      {
        id: "rendicion-2024",
        label: "2024",
        type: "video",
        src: "",
        Icon: IoFilmOutline,
      },
    ],
  },
  {
    id: "pedi-poa",
    label: "PEDI y POA",
    items: [
      {
        id: "pedi-2023-2028",
        label: "PEDI 2023 – 2028 Aprobado",
        type: "pdf",
        src: "/documents/pedi-2023-2028.pdf",
        Icon: IoDocumentOutline,
      },
      {
        id: "poa-2024",
        label: "Plan Operativo Anual 2024 SF",
        type: "pdf",
        src: "/documents/poa-2024.pdf",
        Icon: IoDocumentOutline,
      },
      {
        id: "poa-2023",
        label: "Plan Operativo Anual 2023 SF",
        type: "pdf",
        src: "/documents/poa-2023.pdf",
        Icon: IoDocumentOutline,
      },
    ],
  },
  {
    id: "politica-calidad",
    label: "Política de Calidad",
    items: [],
  },
];

export default EXPLORER_REGISTRY;
