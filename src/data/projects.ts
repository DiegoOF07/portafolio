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
import sqliteLogo from '@/assets/logos/sqlite.svg'

import logisticaLanding from '@/assets/img/01_dapa-landing.webp'
import logisticaCotizaciones from '@/assets/img/05_dapa-quotes.png'
import logisticaVehiculos from '@/assets/img/04_dapa-vehicle.png'
import logisticaFormCreacion from '@/assets/img/03_dapa-form.png'
import logisticaFormulario from '@/assets/img/02_dapa-form.png'
import logisticaFinancial from '@/assets/img/06_dapa-financial.png'
import invitadoEspecial from '@/assets/img/invitado-especial.webp'
import mcpArquitectura from '@/assets/img/mcp-arquitectura.svg'
import graficasRust from '@/assets/img/graficas-rust.webp'

import mcpCli from '@/assets/img/01_mcp-cli.webp'
import mcpCliConsulta from '@/assets/img/02_mcp-cli-complex-query.webp'
import mcpCliRegistro from '@/assets/img/03_mcp-cli-config.webp'
import mcpWebConfirmacion from '@/assets/img/04_mcp-web-permission-modal.webp'
import mcpWebResultado from '@/assets/img/05_mcp-web-restock-results.webp'

export interface TechRef {
  name: string
  icon?: string
}

export interface ProjectLinks {
  // Lista con etiqueta propia: un proyecto puede tener uno, dos o tres
  // repos y no siempre son "frontend" y "backend" (ver el proyecto MCP,
  // que son servidor, cliente y release).
  repos?: { label: string; url: string }[]
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
  // Para una serie de proyectos hermanos: cada pieza con su repo y su video,
  // en vez de apilar seis links sueltos en una tarjeta compacta.
  parts?: { name: string; repo: string; video?: string }[]
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
      repos: [
        { label: 'Repo frontend', url: 'https://github.com/JuanDsm04/dapa-frontend' },
        { label: 'Repo backend', url: 'https://github.com/vicperezch/dapa-backend' },
      ],
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
    slug: 'mcp-desde-cero',
    title: 'Cliente y servidor MCP escritos desde cero',
    tagline:
      'Asistente conversacional que responde sobre recetas, inventario y alérgenos de un restaurante con un cliente capaz de hablar con cualquier servidor MCP y un servidor propio que resuelve el dominio.',
    context: 'Proyecto personal · individual · septiembre 2026',
    challenge:
      'Implementar el Model Context Protocol a mano incluyendo el framing JSON-RPC 2.0, handshake de initialize y negociación entre dos revisiones, en lugar de apoyarse en el SDK, para entender qué viaja realmente por el cable. El cliente fusiona las herramientas de varios servidores en un solo catálogo y el servidor resuelve los permisos por rol antes de ejecutar nada, de modo que el modelo nunca calcula cuántas porciones quedan ni recuerda una receta.',
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'TypeScript', icon: tsLogo },
      { name: 'SQLite', icon: sqliteLogo },
    ],
    status: 'Repositorios públicos, con binarios para cinco plataformas y checksums.',
    links: {
      repos: [
        { label: 'Repo servidor (Go)', url: 'https://github.com/DiegoOF07/restaurant-mcp-server' },
        { label: 'Repo cliente (TypeScript)', url: 'https://github.com/DiegoOF07/restaurant-assistant' },
        { label: 'Release v0.3.0', url: 'https://github.com/DiegoOF07/restaurant-mcp-server/releases/tag/v0.3.0' },
      ],
    },
    media: {
      type: 'image',
      src: mcpArquitectura,
      alt: 'Diagrama: el cliente en TypeScript (interfaz de terminal o web, host con el modelo y mcp-client) habla JSON-RPC 2.0 sobre stdio o HTTP con el servidor en Go, que pasa por el control de rol antes de llegar a las herramientas y a SQLite',
    },
    detail: {
      gallery: [
        {
          type: 'image',
          src: mcpCli,
          alt: 'Arranque del cliente en la terminal: la sesión con rol de administrador, el servidor declarado en mcp.servers.json, el catálogo de las cinco herramientas con su descripción y una primera pregunta que dispara una llamada al protocolo',
        },
        {
          type: 'image',
          src: mcpCliConsulta,
          alt: 'Una sola pregunta encadena cuatro llamadas a herramientas; la respuesta lista los ingredientes con sus alérgenos y distingue el platillo que sí alcanza para dos porciones del que no, indicando cuánto queso falta',
        },
        {
          type: 'image',
          src: mcpCliRegistro,
          alt: 'El comando /log muestra el registro de la sesión: cada petición tools/call emparejada con su respuesta y su marca de tiempo, junto a la lista de servidores conectados y sus herramientas',
        },
        {
          type: 'image',
          src: mcpWebConfirmacion,
          alt: 'Interfaz web: antes de ejecutar una operación que modifica datos, el cliente pide confirmación y muestra la herramienta, cada argumento y la clave de idempotencia',
        },
        {
          type: 'image',
          src: mcpWebResultado,
          alt: 'Tras confirmar, el inventario de queso pasa de 40 a 240 gramos y el asistente explica que el queso es el cuello de botella: alcanza para tres hamburguesas',
        },
      ],
      extendedDescription:
        'El sistema son dos programas que se hablan por el Model Context Protocol. El servidor, en Go, expone cinco herramientas sobre la base de datos de un restaurante: buscar platillos, buscar ingredientes con sus alérgenos, consultar la receta de un platillo, calcular cuántas porciones alcanzan con el inventario actual y registrar ajustes de stock. El cliente, en TypeScript, conecta un modelo de lenguaje con esos servidores y le deja decidir qué preguntar; se maneja desde una terminal o desde una interfaz web, y las dos muestran en vivo cada llamada del protocolo.\n\nNinguno de los dos usa el SDK de MCP. El protocolo está implementado a mano en ambos lados: el framing de JSON-RPC 2.0, el handshake de initialize con negociación de versión, la correlación de peticiones y respuestas por id, la paginación y los códigos de error estándar. La razón de hacerlo así fue entender el protocolo en lugar de consumirlo, y el efecto secundario es saber exactamente qué pasa cuando el handshake falla o cuando llega una respuesta sin petición.\n\nDel lado del cliente, lo interesante es que no está atado a este servidor. Los servidores se declaran en un archivo de configuración y sus herramientas se fusionan en un único catálogo que se le ofrece al modelo; si dos servidores exponen una herramienta con el mismo nombre, el cliente falla de forma explícita en vez de elegir uno en silencio. Habla igual con un servidor local levantado como subproceso que con uno remoto por HTTP con token, que es como están tomadas las capturas. El proveedor del modelo también está detrás de una interfaz, así que cambiarlo no toca la lógica del protocolo, y existe un proveedor de demostración que ejercita todo el flujo sin necesidad de una API key.\n\nDel lado del servidor, la decisión de diseño es que el modelo no es la autoridad. Antes de una operación que modifica datos el cliente pide confirmación explícita al usuario, y el servidor vuelve a verificar el rol por su cuenta: los permisos se evalúan antes de ejecutar el handler y fallan cerrados. Las restricciones de inventario viven en el esquema de la base y cada ajuste lleva una clave de idempotencia para que reintentar una llamada no descuente dos veces. Usa SQLite con un driver escrito en Go puro, así que compila sin C y se distribuye como un binario estático: el release publica binarios para Windows, macOS Intel y Apple Silicon, y Linux en amd64 y arm64, con sus checksums.',
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
      // TODO: demo pública cuando el despliegue esté en línea
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
    status: 'Repositorios públicos; sin demo desplegada.',
    links: {
      repos: [
        { label: 'Repo frontend', url: 'https://github.com/DiegoOF07/db2-project2-frontend' },
        { label: 'Repo backend', url: 'https://github.com/DiegoOF07/db2-project2-backend' },
      ],
    },
  },
  {
    slug: 'optimizador-rutas',
    title: 'Optimizador de rutas con algoritmos genéticos',
    tagline:
      'Aplicación web que calcula el mejor recorrido entre varios destinos con un algoritmo genético y lo dibuja sobre un mapa interactivo.',
    context: 'Proyecto personal · en equipo',
    challenge:
      'Reducir un problema de ruteo con explosión combinatoria usando un algoritmo genético sobre datos geográficos reales: hasta 15 destinos dentro de un radio de 100 km, minimizando la distancia total del recorrido. El cálculo corre en funciones de Google Cloud y el resultado se traza sobre Google Maps.',
    techs: [
      { name: 'Python', icon: pythonLogo },
      { name: 'React', icon: reactLogo },
      { name: 'Google Cloud Platform', icon: gcpLogo },
    ],
    status: 'Repositorio público; sin demo desplegada.',
    links: {
      repos: [{ label: 'Repositorio', url: 'https://github.com/Isabella334/RoutesOptimization' }],
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
    description:
      'Genera analizadores a partir de especificaciones .yalex y .yapar: construye el AFD directo desde las expresiones regulares, calcula FIRST y FOLLOW y arma tablas LL(1), SLR y LALR.',
    techs: [
      { name: 'Python', icon: pythonLogo },
      { name: 'PySide6', icon: pyside6Logo },
    ],
    media: { type: 'gif', src: '', alt: 'Analizador léxico y sintáctico' }, // TODO: gif de la interfaz
    links: {
      repos: [{ label: 'Repo', url: 'https://github.com/DiegoOF07/generador-sintactico' }],
    },
  },
  {
    slug: 'graficas-rust',
    title: 'Serie de gráficas por computadora en Rust',
    description:
      'Tres renderizadores escritos desde cero: un juego en primera persona con raycasting, un raytracer de escenas de Minecraft con reflexión y refracción, y un sistema solar con shaders procedurales.',
    techs: [
      { name: 'Rust', icon: rustLogo },
      { name: 'raylib', icon: raylibLogo },
    ],
    media: {
      type: 'image',
      // Fotograma del video del raytracer, servido local en vez de enlazado a YouTube
      src: graficasRust,
      alt: 'Escena de Minecraft renderizada por el raytracer, con el contador de FPS, el tiempo de render y el modo multihilo sobre la imagen',
    },
    links: {},
    parts: [
      {
        name: 'Raycaster',
        repo: 'https://github.com/DiegoOF07/project1-graphics',
        video: 'https://www.youtube.com/watch?v=8QwW1_mKImg',
      },
      {
        name: 'Raytracer',
        repo: 'https://github.com/DiegoOF07/project2-graphics',
        video: 'https://youtu.be/k_zkKDIqTmM',
      },
      {
        name: 'Sistema solar',
        repo: 'https://github.com/DiegoOF07/project3-graphics',
        video: 'https://www.youtube.com/watch?v=KpaX5xlLnqM',
      },
    ],
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
      repos: [{ label: 'Repo', url: 'https://github.com/DiegoOF07/ggj-2026' }],
    },
  },
]

// Utilidad para la página de detalle
export const getFeaturedProjectBySlug = (slug: string) =>
  featuredProjects.find((p) => p.slug === slug && p.hasDetail)
