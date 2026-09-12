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
import dockerLogo from '@/assets/logos/docker.svg'

import logisticaLanding from '@/assets/img/01_dapa-landing.webp'
import logisticaCotizaciones from '@/assets/img/05_dapa-quotes.png'
import logisticaVehiculos from '@/assets/img/04_dapa-vehicle.png'
import logisticaFormCreacion from '@/assets/img/03_dapa-form.png'
import logisticaFormulario from '@/assets/img/02_dapa-form.png'
import logisticaFinancial from '@/assets/img/06_dapa-financial.png'
import invitadoEspecial from '@/assets/img/invitado-especial.webp'

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
  // 5. resultado/estado. Vacío si no hay nada verificable que decir.
  status: string
  // 6. links
  links: ProjectLinks
  // Captura principal. Los proyectos sin capturas reales no la llevan:
  // se muestran como fila de texto en vez de con una imagen de relleno.
  media?: MediaAsset
  // Pieza principal de la sección: se muestra grande, con su captura.
  lead?: boolean
  // Se deriva del contenido (ver withDerivedDetail): true solo si el
  // detalle tiene galería o descripción, para no enlazar a una página vacía.
  hasDetail: boolean
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

type FeaturedProjectData = Omit<FeaturedProject, 'hasDetail'>

const withDerivedDetail = (p: FeaturedProjectData): FeaturedProject => ({
  ...p,
  hasDetail: Boolean(p.detail && (p.detail.gallery.length > 0 || p.detail.extendedDescription.trim())),
})

const featuredProjectData: FeaturedProjectData[] = [
  {
    slug: 'dapa-logistica',
    title: 'Sistema administrativo de logística',
    tagline:
      'Plataforma para gestionar empleados, vehículos y cotizaciones de una empresa real de transporte.',
    context: 'Cliente real (Transporte) · Proyecto grupal · Duración 1 año · Scrum/Jira',
    challenge:
      'Diseñar un subsistema de formularios dinámicos, donde el administrador agrega, edita o elimina preguntas sin que un desarrollador toque el código, y esas respuestas generan automáticamente las cotizaciones.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'PostgreSQL', icon: postgresLogo },
      { name: 'Docker', icon: dockerLogo },
    ],
    status: 'Desplegado en AWS (actualmente fuera de línea).',
    links: {
      // Distintos repos para frontend y backend
      repoFrontend: 'https://github.com/JuanDsm04/dapa-frontend',
      repoBackend: 'https://github.com/vicperezch/dapa-backend',
      privacyNote: 'Proyecto para cliente real, repositorios disponibles para mostrar en entrevista.',
    },
    media: {
      type: 'image',
      src: logisticaCotizaciones,
      alt: 'Módulo de cotizaciones: solicitudes pendientes y las respuestas del formulario de un cliente',
    },
    lead: true,
    detail: {
      gallery: [
        { type: 'image', src: logisticaLanding, alt: 'Sitio público de la empresa, con el acceso al formulario de cotización' },
        { type: 'image', src: logisticaCotizaciones, alt: 'Cotizaciones de los clientes' },
        { type: 'image', src: logisticaVehiculos, alt: 'Módulo de gestión de vehículos' },
        { type: 'image', src: logisticaFormulario, alt: 'Formulario para los clientes' },
        { type: 'image', src: logisticaFormCreacion, alt: 'Módulo para la gestión del formulario' },
        { type: 'image', src: logisticaFinancial, alt: 'Dashboard general con KPIs y alertas' },
      ],
      extendedDescription:
        'Sistema administrativo completo para una empresa de transporte real, desarrollado en equipo durante aproximadamente 1 año bajo metodología Scrum por medio de Jira. La arquitectura está basada en un backend con Go y un frontend con Vue, usando PostgreSQL como base de datos principal.\n\nEl componente más innovador es el cotizador dinámico: un subsistema donde el administrador puede crear, editar o eliminar preguntas de formulario sin tocar código y las respuestas generan automáticamente cotizaciones para que el administrador las vea y decida qué hacer.\n\nEl sistema incluye gestión de vehículos, conductores, cotizaciones, pedidos y mantenimiento preventivo. El dashboard centralizado muestra KPIs operativos, alertas de mantenimiento y métricas de eficiencia de la flota.\n\nTodo se orquesta con Docker para mejorar la portabilidad.',
    },
  },
  {
    slug: 'fundacion-hannah',
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
    // TODO: con capturas o descripción, el detalle se habilita solo
    detail: {
      gallery: [],
      extendedDescription: '',
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
    // TODO: con los links de demo/repos, volver a indicar el estado
    status: '',
    links: {
      repoFrontend: '', // TODO: link repo frontend
      repoBackend: '',  // TODO: link repo backend
      demo: '', // TODO: link demo
    },
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
    // TODO: con los links de demo/repos, volver a indicar el estado
    status: '',
    links: {
      repoFrontend: '', // TODO: link repo frontend
      repoBackend: '',  // TODO: link repo backend
      demo: '', // TODO: link demo
    },
  },
]

export const featuredProjects: FeaturedProject[] = featuredProjectData.map(withDerivedDetail)

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
    description: 'Renderizado de escenas 3D en Rust con raylib.',
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
      // Copia local: la URL de la Global Game Jam lleva un token que caduca
      src: invitadoEspecial,
      alt: 'Invitado especial: los sospechosos en una rueda de reconocimiento',
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
