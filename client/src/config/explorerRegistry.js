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
        icon: "/images/icons/icon-quienes-somos.webp",
      },
      {
        id: "historia-ismac",
        label: "Historia Ismac",
        type: "app",
        appId: "historia-ismac",
        icon: "/images/icons/icon-historia-ismac.webp",
      },
      {
        id: "nosotros-ismac",
        label: "Nosotros Ismac",
        type: "video",
        src: "https://player.vimeo.com/video/691163823?h=ead4c35efe&badge=0&autopause=0&player_id=0",
        icon: "/images/icons/icon-nosotros.webp",
      },
      {
        id: "ubicacion-ismac",
        label: "Ubicación Ismac",
        type: "app",
        appId: "ubicacion-ismac",
        icon: "/images/icons/icon-ubicacion-ismac.webp",
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
        icon: "/images/icons/icon-dantesga.webp",
      },
    ],
  },
  {
    id: "producciones",
    label: "Producciones",
    items: [
      {
        id: "podcast-ismac",
        label: "Podcast Ismac",
        type: "link",
        href: "https://podcasters.spotify.com/pod/show/ismac",
        icon: "/images/icons/icon-podcast.webp",
      },
    ],
  },
  {
    id: "normativas",
    label: "Normativas",
    items: [
      {
        id: "loes",
        label: "LOES",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-loes.pdf",
        icon: "/images/icons/icon-loes.webp",
      },
      {
        id: "reglamento-faltas",
        label: "Reglamento de Faltas y Sanciones",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-r-faltas-sanciones.pdf",
        icon: "/images/icons/icon-reglamiento-faltas-sanciones.webp",
      },
      {
        id: "ley-organica",
        label: "Reglamento Ley Orgánica Superior",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-r-ley-organica-superior.pdf",
        icon: "/images/icons/icon-reglamiento-lo-superior.webp",
      },
      {
        id: "constitucion",
        label: "Constitución de la República del Ecuador",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-constitucion-republica-ecuador.pdf",
        icon: "/images/icons/icon-constitucion-ecuador.webp",
      },
      {
        id: "reglamento-academico",
        label: "Reglamento Régimen Académico",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-r-regimen-academico.pdf",
        icon: "/images/icons/icon-r-regimen-academico.webp",
      },
      {
        id: "codigo-etica",
        label: "Código de Ética",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-codigo-etica.pdf",
        icon: "/images/icons/icon-codigo-etica.webp",
      },
      {
        id: "manual-interculturalidad",
        label: "Manual de Aplicación del Principio de Interculturalidad",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-manual-aplicacion-principio-interculturalidad.pdf",
        icon: "/images/icons/icon-manual-ap-interculturalidad.webp",
      },
      {
        id: "plan-igualdad",
        label: "Plan de Igualdad Ismac",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-plan-igualdad-ismac.pdf",
        icon: "/images/icons/icon-plan-igualdad.webp",
      },
      {
        id: "politicas-datos",
        label: "Políticas de Tratamiento de Datos",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-politicas-tratamiento-datos.pdf",
        icon: "/images/icons/icon-p-tratamiento-datos.webp",
      },
      {
        id: "manual-funciones",
        label: "Manual de Funciones Instituto Ismac",
        type: "pdf",
        src: "/documents/explorador/normativas/pdf-manual-funciones-ismac.pdf",
        icon: "/images/icons/icon-manual-funciones.webp",
      },
      {
        id: "infraestructura",
        label: "Infraestructura",
        type: "group",
        icon: "/images/icons/icon-infraestructura.webp",
        files: [
          {
            id: "infra-seguridad",
            label: "Normativa Interna de Seguridad y Salud Laboral",
            src: "/documents/explorador/normativas/infraestructura/pdf-normativa-interna-seguridad-salud-laboral.pdf",
          },
          {
            id: "infra-emergencias",
            label: "Plan de Emergencias",
            src: "/documents/explorador/normativas/infraestructura/pdf-plan-emergencias.pdf",
          },
        ],
      },
      {
        id: "planificacion-estrategica",
        label: "Planificación Estratégica",
        type: "pdf",
        src: "/documents/explorador/normativas/planificacion-estrategica.pdf",
        icon: "/images/icons/icon-planificacion-estrategica.webp",
      },
      {
        id: "relaciones-interinstitucionales",
        label: "Relaciones Interinstitucionales para el Desarrollo",
        type: "pdf",
        src: "/documents/explorador/normativas/relaciones-interinstitucionales.pdf",
        icon: "/images/icons/icon-relaciones-interinstitucionales.webp",
      },
      {
        id: "aseguramiento-calidad",
        label: "Aseguramiento Interno de la Calidad",
        type: "pdf",
        src: "/documents/explorador/normativas/aseguramiento-calidad.pdf",
        icon: "/images/icons/icon-aseguramiento-calidad.webp",
      },
      {
        id: "sistema-informatico",
        label: "Sistema Informático de Gestión",
        type: "pdf",
        src: "/documents/explorador/normativas/sistema-informatico.pdf",
        icon: "/images/icons/icon-sistema-informatico.webp",
      },
      {
        id: "igualdad-oportunidades",
        label: "Igualdad de Oportunidades, No Discriminación e Igualdad",
        type: "group",
        icon: "/images/icons/icon-igualdad-oportunidades.webp",
        files: [
          {
            id: "io-accion-afirmativa",
            label: "Reglamento de Acción Afirmativa",
            src: "/documents/explorador/normativas/igualdad-oportunidades/pdf-r-accion-afirmativa.pdf",
          },
          {
            id: "io-folleto-accion-afirmativa",
            label: "Folleto Informativo Acción Afirmativa",
            src: "/documents/explorador/normativas/igualdad-oportunidades/pdf-folleto-accion-afirmativa.pdf",
          },
          {
            id: "io-manual-interculturalidad",
            label: "Manual de Aplicación del Principio de Interculturalidad",
            src: "/documents/explorador/normativas/igualdad-oportunidades/pdf-manual-interculturalidad.pdf",
          },
          {
            id: "io-protocolo-acoso",
            label: "Protocolo de Prevención en Casos de Acoso, Discriminación y Violencia",
            src: "/documents/explorador/normativas/igualdad-oportunidades/pdf-protocolo-prevencion-acoso.pdf",
          },
          {
            id: "io-plan-igualdad",
            label: "Plan de Igualdad Ismac",
            src: "/documents/explorador/normativas/igualdad-oportunidades/pdf-plan-igualdad.pdf",
          },
        ],
      },
      {
        id: "etica-transparencia",
        label: "Ética y Transparencia",
        type: "group",
        icon: "/images/icons/icon-etica-transparencia.webp",
        files: [
          {
            id: "et-codigo-etica",
            label: "Código de Ética",
            src: "/documents/explorador/normativas/etica-transparencia/pdf-codigo-etica.pdf",
          },
          {
            id: "et-faltas-sanciones",
            label: "Reglamento de Faltas y Sanciones",
            src: "/documents/explorador/normativas/etica-transparencia/pdf-r-faltas-sanciones.pdf",
          },
          {
            id: "et-diseno-examenes",
            label: "Normativa de Diseño y Aplicación de Exámenes",
            src: "/documents/explorador/normativas/etica-transparencia/pdf-normativa-diseno-examenes.pdf",
          },
          {
            id: "et-proceso-disciplinario",
            label: "Proceso Disciplinario por Infracción de Normativa",
            src: "/documents/explorador/normativas/etica-transparencia/pdf-proceso-disciplinario.pdf",
          },
        ],
      },
      {
        id: "profesores",
        label: "Profesores",
        type: "group",
        icon: "/images/icons/icon-profesores.webp",
        files: [
          {
            id: "prof-seleccion",
            label: "Reglamento de Selección de Profesores",
            src: "/documents/explorador/normativas/profesores/pdf-r-seleccion-profesores.pdf",
          },
          {
            id: "prof-evaluacion",
            label: "Reglamento de Evaluación de Profesores",
            src: "/documents/explorador/normativas/profesores/pdf-r-evaluacion-profesores.pdf",
          },
          {
            id: "prof-seguimiento",
            label: "Reglamento de Seguimiento y Evaluación del Proceso Docente",
            src: "/documents/explorador/normativas/profesores/pdf-r-seguimiento-docente.pdf",
          },
          {
            id: "prof-reconocimientos",
            label: "Instructivo de Reconocimientos y Estímulos al Personal Académico",
            src: "/documents/explorador/normativas/profesores/pdf-instructivo-reconocimientos.pdf",
          },
        ],
      },
      {
        id: "formacion-capacitacion",
        label: "Formación y Capacitación",
        type: "pdf",
        src: "/documents/explorador/normativas/formacion-capacitacion.pdf",
        icon: "/images/icons/icon-formacion-capacitacion.webp",
      },
      {
        id: "acompanamiento-pedagogico",
        label: "Acompañamiento Pedagógico",
        type: "pdf",
        src: "/documents/explorador/normativas/acompanamiento-pedagogico.pdf",
        icon: "/images/icons/icon-acompanamiento-pedagogico.webp",
      },
      {
        id: "relacion-graduados",
        label: "Relación con los Graduados",
        type: "pdf",
        src: "/documents/explorador/normativas/relacion-graduados.pdf",
        icon: "/images/icons/icon-relacion-graduados.webp",
      },
      {
        id: "entorno-virtual",
        label: "Entorno Virtual",
        type: "pdf",
        src: "/documents/explorador/normativas/entorno-virtual.pdf",
        icon: "/images/icons/icon-entorno-virtual.webp",
      },
      {
        id: "formacion-valores",
        label: "Formación en Valores y Habilidades Blandas",
        type: "pdf",
        src: "/documents/explorador/normativas/formacion-valores.pdf",
        icon: "/images/icons/icon-formacion-valores.webp",
      },
      {
        id: "formacion-practica",
        label: "Formación Práctica en el Entorno Académico y Laboral Real",
        type: "group",
        icon: "/images/icons/icon-formacion-practica.webp",
        files: [
          {
            id: "fp-academico",
            label: "Reglamento de Formación Práctica en el Entorno Académico",
            src: "/documents/explorador/normativas/formacion-practica/pdf-r-formacion-practica-academico.pdf",
          },
          {
            id: "fp-laboral",
            label: "Reglamento de Sistema de Formación Práctica en el Entorno Laboral Real",
            src: "/documents/explorador/normativas/formacion-practica/pdf-r-formacion-practica-laboral.pdf",
          },
        ],
      },
      {
        id: "biblioteca",
        label: "Biblioteca",
        type: "group",
        icon: "/images/icons/icon-biblioteca.webp",
        files: [
          {
            id: "bib-reglamento",
            label: "Reglamento de Biblioteca",
            src: "/documents/explorador/normativas/biblioteca/pdf-r-biblioteca.pdf",
          },
          {
            id: "bib-plan-formacion",
            label: "Plan de Formación de Usuarios de Biblioteca",
            src: "/documents/explorador/normativas/biblioteca/pdf-plan-formacion-usuarios.pdf",
          },
          {
            id: "bib-manual-personal",
            label: "Manual de Preparación del Personal de Biblioteca",
            src: "/documents/explorador/normativas/biblioteca/pdf-manual-preparacion-personal.pdf",
          },
          {
            id: "bib-manual-e-libro",
            label: "Manual E-Libro",
            src: "/documents/explorador/normativas/biblioteca/pdf-manual-e-libro.pdf",
          },
          {
            id: "bib-prestamos",
            label: "Manual para Préstamos Bibliográficos",
            src: "/documents/explorador/normativas/biblioteca/pdf-manual-prestamos.pdf",
          },
        ],
      },
      {
        id: "investigacion-desarrollo",
        label: "Investigación, Desarrollo e Innovación",
        type: "group",
        icon: "/images/icons/icon-investigacion-desarrollo.webp",
        files: [
          {
            id: "id-reglamento",
            label: "Reglamento de Investigación, Desarrollo e Innovación",
            src: "/documents/explorador/normativas/investigacion-desarrollo/pdf-r-investigacion-desarrollo.pdf",
          },
          {
            id: "id-sistema-innovacion",
            label: "Reglamento de Sistema de Innovación y Absorción",
            src: "/documents/explorador/normativas/investigacion-desarrollo/pdf-r-sistema-innovacion.pdf",
          },
        ],
      },
      {
        id: "vinculacion-sociedad",
        label: "Vinculación con la Sociedad",
        type: "pdf",
        src: "/documents/explorador/normativas/vinculacion-sociedad.pdf",
        icon: "/images/icons/icon-vinculacion-sociedad.webp",
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
        icon: "/images/icons/icon-reproductor.webp",
      },
      {
        id: "rendicion-2023",
        label: "2023",
        type: "video",
        src: "",
        icon: "/images/icons/icon-reproductor.webp",
      },
      {
        id: "rendicion-2024",
        label: "2024",
        type: "video",
        src: "",
        icon: "/images/icons/icon-reproductor.webp",
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
        icon: "/images/icons/icon-pdf.webp",
      },
      {
        id: "poa-2024",
        label: "Plan Operativo Anual 2024 SF",
        type: "pdf",
        src: "/documents/poa-2024.pdf",
        icon: "/images/icons/icon-pdf.webp",
      },
      {
        id: "poa-2023",
        label: "Plan Operativo Anual 2023 SF",
        type: "pdf",
        src: "/documents/poa-2023.pdf",
        icon: "/images/icons/icon-pdf.webp",
      },
    ],
  },
  {
    id: "politica-calidad",
    label: "Política de Calidad",
    items: [
      {
        id: "politica-calidad-ismac",
        label: "Política de Calidad Ismac",
        type: "pdf",
        src: "/documents/politica-calidad.pdf",
        icon: "/images/icons/icon-pdf.webp",
      },
    ],
  },
];

export default EXPLORER_REGISTRY;
