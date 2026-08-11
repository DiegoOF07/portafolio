// ============================================================================
// Fuente única de datos para proyectos destacados y experimentales.
// Agregar un proyecto nuevo = agregar un objeto nuevo a alguno de los arrays.
// No hay que tocar componentes ni rutas.
// ============================================================================

import goLogo from '@/assets/logos/go.svg'
import vueLogo from '@/assets/logos/vue.svg'
import reactLogo from '@/assets/logos/react.svg'
import tsLogo from '@/assets/logos/typescript.svg'
import pythonLogo from '@/assets/logos/python.svg'
import postgresLogo from '@/assets/logos/postgresql.svg'

// TODO: agregar logos reales cuando estén disponibles (Supabase, Neo4j, GCP, Rust)
// Por ahora se referencian por nombre y el TechBadge se renderiza sin ícono si falta.

export interface TechRef {
  name: string
  icon?: string
}

export interface ProjectLinks {
  repo?: string          // repo único (si no está separado en front/back)
  repoFrontend?: string  // TODO: link al repo de frontend
  repoBackend?: string   // TODO: link al repo de backend
  demo?: string          // TODO: link a demo en vivo
  privacyNote?: string   // usar en vez de repo/demo cuando el proyecto es de un cliente real
}

export interface MediaAsset {
  // Deja src vacío ("") mientras no haya recurso: se muestra un placeholder visual.
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
    extendedDescription: string // TODO: redactar descripción larga para la página de detalle
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

// ----------------------------------------------------------------------------
// Proyectos destacados (orden = orden del CV, no reordenar sin razón)
// ----------------------------------------------------------------------------

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'fundacion',
    title: 'Sistema de gestión para fundación',
    tagline:
      'Plataforma web para una ONG real: control de pacientes, donaciones, eventos y voluntarios, además de un sitio público para dar visibilidad a la fundación.',
    context: 'Cliente real (ONG) · proyecto individual · en curso',
    challenge:
      'Diseñar el sistema completo siguiendo fases formales de ingeniería de software, manteniéndolo usable para personal no técnico de la fundación.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Supabase' }, // TODO: logo de Supabase
    ],
    status: 'En curso — despliegue con dominio propio planificado para 2026.',
    links: {
      // Por privacidad del cliente no se comparte el repositorio.
      privacyNote: 'Repositorio privado por confidencialidad del cliente. Disponible para mostrar en entrevista.',
      // TODO: demo pública cuando esté disponible
      demo: '',
    },
    media: { type: 'image', src: '', alt: 'Sistema de gestión para fundación' }, // TODO: agregar imagen/gif
    hasDetail: true,
    detail: {
      gallery: [], // TODO: agregar screenshots/gif del dashboard y sitio público
      extendedDescription: '', // TODO: redactar
    },
  },
  {
    slug: 'logistica',
    title: 'Sistema administrativo de logística',
    tagline:
      'Plataforma para gestionar empleados, vehículos y cotizaciones de una empresa real de transporte.',
    context: 'Cliente real (transporte) · en equipo, ~1 año · Scrum/Jira',
    challenge:
      'Diseñar un subsistema de formularios dinámicos: el administrador agrega, edita o elimina preguntas sin que un desarrollador toque el código, y esas respuestas generan automáticamente las cotizaciones.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'PostgreSQL', icon: postgresLogo },
    ],
    status: 'Desplegado en AWS (actualmente fuera de línea).',
    links: {
      // Distintos repos para frontend y backend
      repoFrontend: '', // TODO: link repo frontend
      repoBackend: '',  // TODO: link repo backend
      privacyNote: 'Proyecto para cliente real — repositorios disponibles para mostrar en entrevista.',
    },
    media: { type: 'image', src: '', alt: 'Sistema administrativo de logística' }, // TODO: agregar imagen/gif
    hasDetail: true,
    detail: {
      gallery: [], // TODO: agregar screenshots del formulario dinámico y cotizador
      extendedDescription: '', // TODO: redactar
    },
  },
  {
    slug: 'recomendador-peliculas',
    title: 'Recomendador de películas',
    tagline:
      'Motor de recomendación que consume la API de TMDB y aplica un modelo basado en grafos para sugerir películas personalizadas.',
    context: 'Proyecto personal · individual',
    challenge:
      'Modelar relaciones (usuarios, películas, géneros, actores) como grafo para que las recomendaciones surjan de recorrer conexiones, en vez de reglas fijas.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Neo4j' }, // TODO: logo de Neo4j
    ],
    status: 'Demo disponible.',
    links: {
      repoFrontend: '', // TODO: link repo frontend
      repoBackend: '',  // TODO: link repo backend
      demo: '', // TODO: link demo
    },
    media: { type: 'image', src: '', alt: 'Recomendador de películas' }, // TODO: agregar imagen/gif
    hasDetail: false,
  },
  {
    slug: 'optimizador-rutas',
    title: 'Optimizador de rutas con algoritmos genéticos',
    tagline:
      'Herramienta que optimiza rutas de servicio combinando datos geográficos reales (Google Cloud Platform) con un algoritmo genético para reducir la complejidad del problema de ruteo.',
    context: 'Proyecto personal · individual',
    challenge:
      'Aplicar un algoritmo genético sobre datos geográficos reales para reducir un problema de ruteo con alta complejidad combinatoria.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'React', icon: reactLogo },
      { name: 'Google Cloud Platform' }, // TODO: logo de GCP
    ],
    status: 'Demo disponible.',
    links: {
      repoFrontend: '', // TODO: link repo frontend
      repoBackend: '',  // TODO: link repo backend
      demo: '', // TODO: link demo
    },
    media: { type: 'image', src: '', alt: 'Optimizador de rutas con algoritmos genéticos' }, // TODO: agregar imagen/gif
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
      { name: 'PySide6' },
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
      { name: 'Rust' }, // TODO: logo de Rust
      { name: 'raylib' },
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
      { name: 'Phaser' },
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
