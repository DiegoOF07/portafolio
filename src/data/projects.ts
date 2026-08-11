// Fuente de datos para proyectos destacados y experimentales.

import goLogo from '@/assets/logos/go.svg'
import vueLogo from '@/assets/logos/vue.svg'
import reactLogo from '@/assets/logos/react.svg'
import tsLogo from '@/assets/logos/typescript.svg'
import pythonLogo from '@/assets/logos/python.svg'
import postgresLogo from '@/assets/logos/postgresql.svg'
import neo4jLogo from '@/assets/logos/neo4j.svg'
import supabaseLogo from '@/assets/logos/supabase.svg'
import gcpLogo from '@/assets/logos/gcp.svg'
import rustLogo from '@/assets/logos/rust.svg'
import pyside6Logo from '@/assets/logos/pyside6.svg'
import phaserLogo from '@/assets/logos/phaser.svg'
import raylibLogo from '@/assets/logos/raylib.svg'

import fundacionMedia from '@/assets/img/proyecto-fundacion.svg'
import logisticaMedia from '@/assets/img/01_dapa.png'
import logisticaDashboard from '@/assets/img/05_dapa-quotes.png'
import logisticaEmpleados from '@/assets/img/04_dapa-vehicle.png'
import logisticaVehiculos from '@/assets/img/03_dapa-form.png'
import logisticaCotizador from '@/assets/img/02_dapa-form.png'
import logisticaRutas from '@/assets/img/06_dapa-financial.png'
import recomendadorMedia from '@/assets/img/proyecto-recomendador.svg'
import optimizadorMedia from '@/assets/img/proyecto-optimizador.svg'

export interface TechRef {
  name: string
  icon?: string
}

export interface ProjectLinks {
  repo?: string          // repo único
  repoFrontend?: string  // link al repo de frontend
  repoBackend?: string   // link al repo de backend
  demo?: string          // link a demo en vivo
  privacyNote?: string   // usar cuando el proyecto es de un cliente real
}

export interface MediaAsset {
  type: 'image' | 'gif' | 'video'
  src: string
  alt: string
}

export interface FeaturedProject {
  slug: string
  title: string
  // 1. una línea de propósito (qué problema resuelve)
  tagline: string
  // 2. contexto: curso/cliente real, duración, solo/equipo
  context: string
  // 3. el reto técnico interesante
  challenge: string
  // 4. stack
  techs: TechRef[]
  // 5. resultado/estado
  status: string
  // 6. links
  links: ProjectLinks
  media: MediaAsset
  // Si es true, la card enlaza a /proyectos/[slug] con más detalle.
  hasDetail: boolean
  // Contenido extendido, solo se usa si hasDetail = true.
  detail?: {
    gallery: MediaAsset[]
    extendedDescription: string
  }
}

export interface ExperimentProject {
  slug: string
  title: string
  description: string
  techs: TechRef[]
  media: MediaAsset
  links: ProjectLinks
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'Fundacion Hannah',
    title: 'Sitio web para Fundación Hannah',
    tagline:
      'Plataforma web para una ONG real con: control de pacientes, donaciones, eventos y voluntarios, además de un sitio público para dar visibilidad a la fundación.',
    context: 'Cliente real (ONG) · Proyecto grupal · En curso',
    challenge:
      'Diseñar el sistema completo siguiendo fases formales de ingeniería de software, manteniéndolo usable para personal no técnico de la fundación. Resultado: la gestión de pacientes, donaciones, eventos y voluntarios centralizada en una sola plataforma hecha a la medida.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Supabase', icon: supabaseLogo },
    ],
    status: 'En curso: despliegue con dominio propio planificado para 2026.',
    links: {
      // Por privacidad del cliente no se comparte el repositorio.
      privacyNote: 'Repositorio privado por confidencialidad del cliente. No disponible para mostrar en entrevista.',
      // TODO: demo pública cuando esté disponible
      demo: '',
    },
    media: { type: 'image', src: fundacionMedia, alt: 'Sistema de gestión para fundación' },
    hasDetail: true,
    detail: {
      gallery: [], // TODO: agregar screenshots/gif del dashboard y sitio público
      extendedDescription: '', // TODO: redactar
    },
  },
  {
    slug: 'DAPA',
    title: 'Sistema administrativo de logística',
    tagline:
      'Plataforma para gestionar empleados, vehículos y cotizaciones de una empresa real de transporte.',
    context: 'Cliente real (Transporte) · Proyecto grupal · ~1 año · Scrum/Jira',
    challenge:
      'Diseñar un subsistema de formularios dinámicos, donde el administrador agrega, edita o elimina preguntas sin que un desarrollador toque el código, y esas respuestas generan automáticamente las cotizaciones.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'PostgreSQL', icon: postgresLogo },
    ],
    status: 'Desplegado en AWS (actualmente fuera de línea).',
    links: {
      // Distintos repos para frontend y backend
      repoFrontend: 'https://github.com/JuanDsm04/dapa-frontend',
      repoBackend: 'https://github.com/vicperezch/dapa-backend',
      privacyNote: 'Proyecto para cliente real, repositorios disponibles para mostrar en entrevista.',
    },
    media: { type: 'image', src: logisticaMedia, alt: 'Sistema administrativo de logística' },
    hasDetail: true,
    detail: {
      gallery: [
        { type: 'image', src: logisticaDashboard, alt: 'Dashboard general con KPIs y alertas' },
        { type: 'image', src: logisticaEmpleados, alt: 'Módulo de gestión de empleados y roles' },
        { type: 'image', src: logisticaVehiculos, alt: 'Módulo de flota, rutas y mantenimiento' },
        { type: 'image', src: logisticaCotizador, alt: 'Cotizador dinámico con formulario configurable' },
        { type: 'image', src: logisticaRutas, alt: 'Mapa de rutas con tracking GPS en tiempo real' },
      ],
      extendedDescription:
        'Sistema administrativo completo para una empresa de transporte real, desarrollado en equipo durante ~1 año bajo metodología Scrum/Jira. La arquitectura está basada en microservicios con Go (backend) y Vue (frontend), usando PostgreSQL como base de datos principal.\n\nEl componente más innovador es el cotizador dinámico: un subsistema donde el administrador puede crear, editar o eliminar preguntas de formulario sin tocar código, y las respuestas generan automáticamente cotizaciones con cálculos de costos, tiempos y márgenes.\n\nEl módulo de flota incluye gestión de vehículos, conductores, rutas y mantenimiento preventivo, con integración GPS para tracking en tiempo real y optimización de rutas. El dashboard centralizado muestra KPIs operativos, alertas de mantenimiento y métricas de eficiencia de la flota.',
    },
  },
  {
    slug: 'recomendador-peliculas',
    title: 'Recomendador de películas',
    tagline:
      'Motor de recomendación que consume la API de TMDB y aplica un modelo basado en grafos para sugerir películas personalizadas.',
    context: 'Proyecto personal · individual',
    challenge:
      'Modelar relaciones (usuarios, películas, géneros, actores) como grafo para que las recomendaciones surjan de recorrer conexiones, en vez de reglas fijas. Resultado: recomendaciones explicables por conexiones reales entre el contenido y el usuario.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Neo4j', icon: neo4jLogo },
    ],
    status: 'Demo disponible.',
    links: {
      repoFrontend: '', // TODO: link repo frontend
      repoBackend: '',  // TODO: link repo backend
      demo: '', // TODO: link demo
    },
    media: { type: 'image', src: recomendadorMedia, alt: 'Recomendador de películas' },
    hasDetail: false,
  },
  {
    slug: 'optimizador-rutas',
    title: 'Optimizador de rutas con algoritmos genéticos',
    tagline:
      'Herramienta que optimiza rutas de servicio combinando datos geográficos reales (Google Cloud Platform) con un algoritmo genético para reducir la complejidad del problema de ruteo.',
    context: 'Proyecto personal · individual',
    challenge:
      'Aplicar un algoritmo genético sobre datos geográficos reales para reducir un problema de ruteo con alta complejidad combinatoria. Resultado: rutas optimizadas a partir de datos reales de Google Cloud Platform.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'React', icon: reactLogo },
      { name: 'Google Cloud Platform', icon: gcpLogo },
    ],
    status: 'Demo disponible.',
    links: {
      repoFrontend: '', // TODO: link repo frontend
      repoBackend: '',  // TODO: link repo backend
      demo: '', // TODO: link demo
    },
    media: { type: 'image', src: optimizadorMedia, alt: 'Optimizador de rutas con algoritmos genéticos' },
    hasDetail: false,
  },
]

// ----------------------------------------------------------------------------
// Proyectos experimentales (sección compacta, apoyo visual fuerte, poco texto)
// ----------------------------------------------------------------------------

export const experimentProjects: ExperimentProject[] = [
  {
    slug: 'analizador-lexico-sintactico',
    title: 'Analizador léxico y sintáctico',
    description: 'Generador de compiladores desde archivos .yalex/.yapar, con interfaz estilo IDE.',
    techs: [
      { name: 'Python', icon: pythonLogo },
      { name: 'PySide6', icon: pyside6Logo },
    ],
    media: { type: 'gif', src: '', alt: 'Analizador léxico y sintáctico' }, // TODO: gif de la interfaz estilo IDE
    links: {
      repo: '', // TODO: link repo
    },
  },
  {
    slug: 'raytracer-rust',
    title: 'Raytracer / escenas 3D en Rust',
    description: 'Renderizado de escenas 3D con raylib. Pieza más vistosa: sistema solar o escena estilo Minecraft.',
    techs: [
      { name: 'Rust', icon: rustLogo },
      { name: 'raylib', icon: raylibLogo },
    ],
    media: { type: 'video', src: '', alt: 'Raytracer en Rust' }, // TODO: video/gif de la escena
    links: {
      repo: '', // TODO: link repo
    },
  },
  {
    slug: 'invitado-especial',
    title: 'Invitado especial',
    description:
      'Juego creado en la Global Game Jam 2026: encontrar al invitado especial y desenmascararlo antes de que sea tarde.',
    techs: [
      { name: 'TypeScript', icon: tsLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Phaser', icon: phaserLogo },
    ],
    media: {
      type: 'image',
      src: 'https://ggjv4.s3.us-west-1.amazonaws.com/files/styles/flexslider_full/s3/games/2026/812398/screenshot/In%20Game.png?VersionId=3ov4AS_izQgNgThRogihS5dtasifW4z8&itok=LtAWOLCa',
      alt: 'Invitado especial - Global Game Jam 2026',
    },
    links: {
      demo: 'https://invitado-especial-game.netlify.app/',
      repo: 'https://github.com/DiegoOF07/ggj-2026.git',
    },
  },
]

// Utilidad para la página de detalle
export const getFeaturedProjectBySlug = (slug: string) =>
  featuredProjects.find((p) => p.slug === slug && p.hasDetail)
