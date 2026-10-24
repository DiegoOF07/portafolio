// Fuente de datos para proyectos destacados y experimentales.

import type { Localized } from '@/i18n'

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
import analizadorSintactico from '@/assets/img/analizador-sintactico.webp'

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
  repos?: { label: Localized; url: string }[]
  demo?: string           // link a demo en vivo
  privacyNote?: Localized // usar cuando el proyecto es de un cliente real
}

export interface MediaAsset {
  type: 'image' | 'gif' | 'video'
  src: string
  alt: Localized
}

export interface FeaturedProject {
  slug: string
  title: Localized
  // 1. una línea de propósito (qué problema resuelve)
  tagline: Localized
  // 2. contexto: académico/personal, cliente real, duración, solo/equipo
  context: Localized
  // 3. el reto técnico interesante
  challenge: Localized
  // 4. stack
  techs: TechRef[]
  // 5. resultado/estado. Se omite si no hay nada verificable que decir.
  status?: Localized
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
    // Párrafos separados por una línea en blanco
    extendedDescription: Localized
  }
}

export interface ExperimentProject {
  slug: string
  title: Localized
  description: Localized
  techs: TechRef[]
  media: MediaAsset
  links: ProjectLinks
  // Para una serie de proyectos hermanos: cada pieza con su repo y su video,
  // en vez de apilar seis links sueltos en una tarjeta compacta.
  parts?: { name: Localized; repo: string; video?: string }[]
}

type FeaturedProjectData = Omit<FeaturedProject, 'hasDetail'>

const withDerivedDetail = (p: FeaturedProjectData): FeaturedProject => ({
  ...p,
  hasDetail: Boolean(p.detail && (p.detail.gallery.length > 0 || p.detail.extendedDescription.es.trim())),
})

const featuredProjectData: FeaturedProjectData[] = [
  {
    slug: 'dapa-logistica',
    title: { es: 'Sistema administrativo de logística', en: 'Logistics management system' },
    tagline: {
      es: 'Plataforma para gestionar empleados, vehículos y cotizaciones de una empresa real de transporte.',
      en: 'A platform to manage the employees, vehicles and price quotes of a real transportation company.',
    },
    context: {
      es: 'Proyecto académico · en equipo · cliente real (transporte) · 1 año · Scrum/Jira',
      en: 'Academic project · team · real client (transportation) · 1 year · Scrum/Jira',
    },
    challenge: {
      es: 'Diseñar un subsistema de formularios dinámicos, donde el administrador agrega, edita o elimina preguntas sin que un desarrollador toque el código, y esas respuestas generan automáticamente las cotizaciones.',
      en: 'Designing a dynamic form subsystem where the administrator adds, edits or removes questions without a developer touching the code, and the answers automatically generate the price quotes.',
    },
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'PostgreSQL', icon: postgresLogo },
      { name: 'Docker', icon: dockerLogo },
    ],
    status: {
      es: 'Desplegado en AWS (actualmente fuera de línea).',
      en: 'Deployed on AWS (currently offline).',
    },
    links: {
      repos: [
        { label: { es: 'Repo frontend', en: 'Frontend repo' }, url: 'https://github.com/JuanDsm04/dapa-frontend' },
        { label: { es: 'Repo backend', en: 'Backend repo' }, url: 'https://github.com/vicperezch/dapa-backend' },
      ],
    },
    media: {
      type: 'image',
      src: logisticaCotizaciones,
      alt: {
        es: 'Módulo de cotizaciones: solicitudes pendientes y las respuestas del formulario de un cliente',
        en: "Quotes module: pending requests and a client's form answers",
      },
    },
    lead: true,
    detail: {
      gallery: [
        {
          type: 'image',
          src: logisticaLanding,
          alt: {
            es: 'Sitio público de la empresa, con el acceso al formulario de cotización',
            en: "The company's public website, with the entry point to the quote form",
          },
        },
        {
          type: 'image',
          src: logisticaCotizaciones,
          alt: { es: 'Cotizaciones de los clientes', en: 'Client quotes' },
        },
        {
          type: 'image',
          src: logisticaVehiculos,
          alt: { es: 'Módulo de gestión de vehículos', en: 'Vehicle management module' },
        },
        {
          type: 'image',
          src: logisticaFormulario,
          alt: { es: 'Formulario para los clientes', en: 'The form clients fill in' },
        },
        {
          type: 'image',
          src: logisticaFormCreacion,
          alt: { es: 'Módulo para la gestión del formulario', en: 'Form management module' },
        },
        {
          type: 'image',
          src: logisticaFinancial,
          alt: { es: 'Dashboard general con KPIs y alertas', en: 'Main dashboard with KPIs and alerts' },
        },
      ],
      extendedDescription: {
        es: 'Sistema administrativo completo para una empresa de transporte real, desarrollado en equipo durante aproximadamente 1 año bajo metodología Scrum por medio de Jira. La arquitectura está basada en un backend con Go y un frontend con Vue, usando PostgreSQL como base de datos principal.\n\nEl componente más innovador es el cotizador dinámico: un subsistema donde el administrador puede crear, editar o eliminar preguntas de formulario sin tocar código y las respuestas generan automáticamente cotizaciones para que el administrador las vea y decida qué hacer.\n\nEl sistema incluye gestión de vehículos, conductores, cotizaciones, pedidos y mantenimiento preventivo. El dashboard centralizado muestra KPIs operativos, alertas de mantenimiento y métricas de eficiencia de la flota.\n\nTodo se orquesta con Docker para mejorar la portabilidad.',
        en: 'A complete management system for a real transportation company, built as a team over roughly one year using Scrum with Jira. The architecture is a Go backend and a Vue frontend, with PostgreSQL as the main database.\n\nThe most innovative piece is the dynamic quoting system: a subsystem where the administrator can create, edit or remove form questions without touching code, and the answers automatically generate quotes for the administrator to review and decide on.\n\nThe system covers vehicles, drivers, quotes, orders and preventive maintenance. A central dashboard shows operational KPIs, maintenance alerts and fleet efficiency metrics.\n\nEverything is orchestrated with Docker for portability.',
      },
    },
  },
  {
    slug: 'fundacion-hannah',
    title: { es: 'Sistema de gestión para Fundación Hannah', en: 'Management system for Fundación Hannah' },
    tagline: {
      es: 'Plataforma web para una ONG real con control de pacientes, donaciones, eventos y voluntarios, además de un sitio público para dar visibilidad a la fundación.',
      en: 'A web platform for a real non-profit to manage patients, donations, events and volunteers, plus a public website to give the foundation visibility.',
    },
    context: {
      es: 'Proyecto académico · en equipo · cliente real (ONG) · en curso · mi rol: backend',
      en: 'Academic project · team · real client (non-profit) · ongoing · my role: backend',
    },
    challenge: {
      es: 'Diseñar el sistema completo siguiendo fases formales de ingeniería de software, manteniéndolo usable para personal no técnico de la fundación. Como resultado se logra la gestión de pacientes, donaciones, eventos y voluntarios centralizada en una sola plataforma hecha a la medida.',
      en: "Designing the whole system through formal software engineering phases while keeping it usable for the foundation's non-technical staff. The result brings patients, donations, events and volunteers together in a single platform built to measure.",
    },
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Supabase', icon: supabaseLogo },
    ],
    status: { es: 'En desarrollo activo.', en: 'In active development.' },
    links: {
      privacyNote: {
        es: 'El repositorio y el sistema interno son privados por confidencialidad del cliente. El sitio público se enlazará cuando esté en línea.',
        en: "The repository and the internal system are private to protect the client's confidentiality. The public website will be linked once it is live.",
      },
      // TODO: demo pública cuando el sitio público esté en línea
    },
  },
  {
    slug: 'diskflow',
    title: { es: 'DiskFlow, auditor visual de almacenamiento', en: 'DiskFlow, a visual storage auditor' },
    tagline: {
      es: 'Aplicación de escritorio que muestra en qué se va el espacio de un workspace de desarrollo (proyectos, dependencias, artefactos de build) mediante un treemap y una tabla sincronizados, sin modificar nunca tus archivos.',
      en: 'A desktop app that shows where the space goes in a development workspace (projects, dependencies, build artifacts) through a synchronized treemap and table, without ever modifying your files.',
    },
    context: {
      es: 'Proyecto personal · individual · 2026 · v0.1 en desarrollo',
      en: 'Personal project · solo · 2026 · v0.1 in development',
    },
    challenge: {
      es: 'Construir un motor de escaneo concurrente que indexa ~100k entradas en ~2.4 s usando menos de 10 MB de heap, con progreso en vivo y cancelación, y mantenerlo independiente de la interfaz para poder probarlo por separado.',
      en: 'Building a concurrent scan engine that indexes ~100k entries in ~2.4 s using under 10 MB of heap, with live progress and cancellation, and keeping it independent of the UI so it can be tested on its own.',
    },
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Wails' },
      { name: 'Vue', icon: vueLogo },
      { name: 'TypeScript', icon: tsLogo },
      { name: 'SQLite', icon: sqliteLogo },
      { name: 'd3-hierarchy' },
    ],
    status: {
      es: 'Repositorio público con CI, pruebas en backend y frontend, releases automatizados y decisiones de arquitectura documentadas (ADRs). Pre-release para Windows.',
      en: 'Public repository with CI, backend and frontend tests, automated releases and documented architecture decisions (ADRs). Pre-release available for Windows.',
    },
    links: {
      repos: [
        { label: { es: 'Repositorio', en: 'Repository' }, url: 'https://github.com/DiegoOF07/Diskflow' },
        {
          label: { es: 'Pre-release v0.1.0-rc.1', en: 'Pre-release v0.1.0-rc.1' },
          url: 'https://github.com/DiegoOF07/Diskflow/releases/tag/v0.1.0-rc.1',
        },
      ],
    },
    // TODO: página de detalle (arquitectura, rendimiento, prácticas, roadmap) y video del treemap
  },
  {
    slug: 'mcp-desde-cero',
    title: { es: 'Cliente y servidor MCP desde cero', en: 'MCP client and server from scratch' },
    tagline: {
      es: 'Asistente conversacional que responde sobre recetas, inventario y alérgenos de un restaurante con un cliente capaz de hablar con cualquier servidor MCP y un servidor propio que resuelve el dominio.',
      en: "A conversational assistant that answers questions about a restaurant's recipes, inventory and allergens, with a client that can talk to any MCP server and a server of my own that handles the domain.",
    },
    context: { es: 'Proyecto académico · septiembre 2026', en: 'Academic project · September 2026' },
    challenge: {
      es: 'Implementar el Model Context Protocol a mano incluyendo el framing JSON-RPC 2.0, handshake de initialize y negociación entre dos revisiones, en lugar de apoyarse en el SDK, para entender qué viaja realmente por el cable. El cliente fusiona las herramientas de varios servidores en un solo catálogo y el servidor resuelve los permisos por rol antes de ejecutar nada, de modo que el modelo nunca calcula cuántas porciones quedan ni recuerda una receta.',
      en: 'Implementing the Model Context Protocol by hand, including JSON-RPC 2.0 framing, the initialize handshake and negotiation between two revisions, instead of relying on the SDK, to understand what actually travels over the wire. The client merges the tools of several servers into a single catalog, and the server resolves role permissions before running anything, so the model never computes how many portions are left or remembers a recipe.',
    },
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'TypeScript', icon: tsLogo },
      { name: 'SQLite', icon: sqliteLogo },
    ],
    status: {
      es: 'Repositorios públicos, con binarios para cinco plataformas y checksums.',
      en: 'Public repositories, with binaries for five platforms and checksums.',
    },
    links: {
      repos: [
        {
          label: { es: 'Repo servidor (Go)', en: 'Server repo (Go)' },
          url: 'https://github.com/DiegoOF07/restaurant-mcp-server',
        },
        {
          label: { es: 'Repo cliente (TypeScript)', en: 'Client repo (TypeScript)' },
          url: 'https://github.com/DiegoOF07/restaurant-assistant',
        },
        {
          label: { es: 'Release v0.3.0', en: 'Release v0.3.0' },
          url: 'https://github.com/DiegoOF07/restaurant-mcp-server/releases/tag/v0.3.0',
        },
      ],
    },
    media: {
      type: 'image',
      src: mcpArquitectura,
      alt: {
        es: 'Diagrama: el cliente en TypeScript (interfaz de terminal o web, host con el modelo y mcp-client) habla JSON-RPC 2.0 sobre stdio o HTTP con el servidor en Go, que pasa por el control de rol antes de llegar a las herramientas y a SQLite',
        en: 'Diagram: the TypeScript client (terminal or web interface, host with the model, and mcp-client) speaks JSON-RPC 2.0 over stdio or HTTP with the Go server, which goes through the role check before reaching the tools and SQLite',
      },
    },
    detail: {
      gallery: [
        {
          type: 'image',
          src: mcpCli,
          alt: {
            es: 'Arranque del cliente en la terminal: la sesión con rol de administrador, el servidor declarado en mcp.servers.json, el catálogo de las cinco herramientas con su descripción y una primera pregunta que dispara una llamada al protocolo',
            en: 'The client starting in the terminal: the session with the administrator role, the server declared in mcp.servers.json, the catalog of the five tools with their descriptions, and a first question that triggers a protocol call',
          },
        },
        {
          type: 'image',
          src: mcpCliConsulta,
          alt: {
            es: 'Una sola pregunta encadena cuatro llamadas a herramientas; la respuesta lista los ingredientes con sus alérgenos y distingue el platillo que sí alcanza para dos porciones del que no, indicando cuánto queso falta',
            en: 'A single question chains four tool calls; the answer lists the ingredients with their allergens and tells apart the dish that has enough for two portions from the one that does not, stating how much cheese is missing',
          },
        },
        {
          type: 'image',
          src: mcpCliRegistro,
          alt: {
            es: 'El comando /log muestra el registro de la sesión: cada petición tools/call emparejada con su respuesta y su marca de tiempo, junto a la lista de servidores conectados y sus herramientas',
            en: 'The /log command shows the session log: each tools/call request paired with its response and timestamp, next to the list of connected servers and their tools',
          },
        },
        {
          type: 'image',
          src: mcpWebConfirmacion,
          alt: {
            es: 'Interfaz web: antes de ejecutar una operación que modifica datos, el cliente pide confirmación y muestra la herramienta, cada argumento y la clave de idempotencia',
            en: 'Web interface: before running an operation that modifies data, the client asks for confirmation and shows the tool, each argument and the idempotency key',
          },
        },
        {
          type: 'image',
          src: mcpWebResultado,
          alt: {
            es: 'Tras confirmar, el inventario de queso pasa de 40 a 240 gramos y el asistente explica que el queso es el cuello de botella: alcanza para tres hamburguesas',
            en: 'After confirming, the cheese inventory goes from 40 to 240 grams and the assistant explains that cheese is the bottleneck: there is enough for three burgers',
          },
        },
      ],
      extendedDescription: {
        es: 'El sistema son dos programas que se hablan por el Model Context Protocol. El servidor, en Go, expone cinco herramientas sobre la base de datos de un restaurante: buscar platillos, buscar ingredientes con sus alérgenos, consultar la receta de un platillo, calcular cuántas porciones alcanzan con el inventario actual y registrar ajustes de stock. El cliente, en TypeScript, conecta un modelo de lenguaje con esos servidores y le deja decidir qué preguntar; se maneja desde una terminal o desde una interfaz web, y las dos muestran en vivo cada llamada del protocolo.\n\nNinguno de los dos usa el SDK de MCP. El protocolo está implementado a mano en ambos lados: el framing de JSON-RPC 2.0, el handshake de initialize con negociación de versión, la correlación de peticiones y respuestas por id, la paginación y los códigos de error estándar. La razón de hacerlo así fue entender el protocolo en lugar de consumirlo, y el efecto secundario es saber exactamente qué pasa cuando el handshake falla o cuando llega una respuesta sin petición.\n\nDel lado del cliente, lo interesante es que no está atado a este servidor. Los servidores se declaran en un archivo de configuración y sus herramientas se fusionan en un único catálogo que se le ofrece al modelo; si dos servidores exponen una herramienta con el mismo nombre, el cliente falla de forma explícita en vez de elegir uno en silencio. Habla igual con un servidor local levantado como subproceso que con uno remoto por HTTP con token, que es como están tomadas las capturas. El proveedor del modelo también está detrás de una interfaz, así que cambiarlo no toca la lógica del protocolo, y existe un proveedor de demostración que ejercita todo el flujo sin necesidad de una API key.\n\nDel lado del servidor, la decisión de diseño es que el modelo no es la autoridad. Antes de una operación que modifica datos el cliente pide confirmación explícita al usuario, y el servidor vuelve a verificar el rol por su cuenta: los permisos se evalúan antes de ejecutar el handler y fallan cerrados. Las restricciones de inventario viven en el esquema de la base y cada ajuste lleva una clave de idempotencia para que reintentar una llamada no descuente dos veces. Usa SQLite con un driver escrito en Go puro, así que compila sin C y se distribuye como un binario estático: el release publica binarios para Windows, macOS Intel y Apple Silicon, y Linux en amd64 y arm64, con sus checksums.',
        en: "The system is two programs that talk to each other over the Model Context Protocol. The server, written in Go, exposes five tools over a restaurant's database: searching dishes, searching ingredients with their allergens, looking up a dish's recipe, computing how many portions the current inventory allows, and recording stock adjustments. The client, written in TypeScript, connects a language model to those servers and lets it decide what to ask; it runs from a terminal or a web interface, and both show every protocol call live.\n\nNeither of them uses the MCP SDK. The protocol is implemented by hand on both sides: JSON-RPC 2.0 framing, the initialize handshake with version negotiation, request/response correlation by id, pagination and the standard error codes. The reason was to understand the protocol rather than just consume it, and the side effect is knowing exactly what happens when the handshake fails or a response arrives with no matching request.\n\nOn the client side, the interesting part is that it is not tied to this server. Servers are declared in a configuration file and their tools are merged into a single catalog offered to the model; if two servers expose a tool with the same name, the client fails explicitly instead of silently picking one. It talks the same way to a local server spawned as a subprocess and to a remote one over HTTP with a token, which is how the screenshots were taken. The model provider also sits behind an interface, so swapping it does not touch the protocol logic, and a demo provider exercises the whole flow without needing an API key.\n\nOn the server side, the design decision is that the model is not the authority. Before an operation that modifies data, the client asks the user for explicit confirmation, and the server checks the role again on its own: permissions are evaluated before the handler runs and fail closed. Inventory constraints live in the database schema, and every adjustment carries an idempotency key so that retrying a call never deducts twice. It uses SQLite with a pure-Go driver, so it builds without C and ships as a static binary: the release publishes binaries for Windows, macOS on Intel and Apple Silicon, and Linux on amd64 and arm64, with their checksums.",
      },
    },
  },
  {
    slug: 'recomendador-peliculas',
    title: { es: 'Recomendador de películas', en: 'Movie recommender' },
    tagline: {
      es: 'Motor de recomendación que consume la API de TMDB y aplica un modelo basado en grafos para sugerir películas personalizadas.',
      en: 'A recommendation engine that consumes the TMDB API and applies a graph-based model to suggest personalized movies.',
    },
    context: { es: 'Proyecto académico · en equipo', en: 'Academic project · team' },
    challenge: {
      es: 'Modelar relaciones (usuarios, películas, géneros, actores) como grafo para que las recomendaciones surjan de recorrer conexiones, en vez de reglas fijas. Resultado: recomendaciones explicables por conexiones reales entre el contenido y el usuario.',
      en: 'Modeling relationships (users, movies, genres, actors) as a graph so that recommendations come from traversing connections instead of fixed rules. The result: recommendations that can be explained by real connections between the content and the user.',
    },
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Neo4j', icon: neo4jLogo },
    ],
    status: {
      es: 'Repositorios públicos; sin demo desplegada.',
      en: 'Public repositories; no live demo.',
    },
    links: {
      repos: [
        {
          label: { es: 'Repo frontend', en: 'Frontend repo' },
          url: 'https://github.com/DiegoOF07/db2-project2-frontend',
        },
        {
          label: { es: 'Repo backend', en: 'Backend repo' },
          url: 'https://github.com/DiegoOF07/db2-project2-backend',
        },
      ],
    },
  },
  {
    slug: 'optimizador-rutas',
    title: { es: 'Optimizador de rutas con algoritmos genéticos', en: 'Route optimizer with genetic algorithms' },
    tagline: {
      es: 'Aplicación web que calcula el mejor recorrido entre varios destinos con un algoritmo genético y lo dibuja sobre un mapa interactivo.',
      en: 'A web app that computes the best route between several destinations with a genetic algorithm and draws it on an interactive map.',
    },
    context: { es: 'Proyecto académico · en equipo', en: 'Academic project · team' },
    challenge: {
      es: 'Reducir un problema de ruteo con explosión combinatoria usando un algoritmo genético sobre datos geográficos reales: hasta 15 destinos dentro de un radio de 100 km, minimizando la distancia total del recorrido. El backend en FastAPI corre en Google Cloud y el resultado se traza sobre Google Maps.',
      en: 'Taming a routing problem with combinatorial explosion using a genetic algorithm over real geographic data: up to 15 destinations within a 100 km radius, minimizing the total distance travelled. The FastAPI backend runs on Google Cloud and the result is drawn on Google Maps.',
    },
    techs: [
      { name: 'Python', icon: pythonLogo },
      { name: 'FastAPI' },
      { name: 'React', icon: reactLogo },
      { name: 'Google Cloud Platform', icon: gcpLogo },
    ],
    status: {
      es: 'Repositorio público; sin demo desplegada.',
      en: 'Public repository; no live demo.',
    },
    links: {
      repos: [
        {
          label: { es: 'Repositorio', en: 'Repository' },
          url: 'https://github.com/Isabella334/RoutesOptimization',
        },
      ],
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
    title: { es: 'Analizador léxico y sintáctico', en: 'Lexer and parser generator' },
    description: {
      es: 'Genera analizadores a partir de especificaciones .yalex y .yapar: construye el AFD directo desde las expresiones regulares, calcula FIRST y FOLLOW, arma tablas LL(1), SLR y LALR, y se recupera de errores de sintaxis en modo pánico en lugar de abortar.',
      en: 'Generates analyzers from .yalex and .yapar specifications: it builds the DFA directly from the regular expressions, computes FIRST and FOLLOW, builds LL(1), SLR and LALR tables, and recovers from syntax errors in panic mode instead of aborting.',
    },
    techs: [
      { name: 'Python', icon: pythonLogo },
      { name: 'PySide6', icon: pyside6Logo },
    ],
    media: {
      type: 'image',
      // Fotograma de la interfaz: la tabla de parseo se reconoce aún a tamaño
      // de tarjeta, cosa que la vista de autómata (texto corrido) no logra.
      src: analizadorSintactico,
      alt: {
        es: 'Tabla de parseo generada por la herramienta: una rejilla de estados contra tokens con las acciones de desplazamiento y reducción',
        en: 'Parse table generated by the tool: a grid of states against tokens with the shift and reduce actions',
      },
    },
    links: {
      repos: [{ label: { es: 'Repo', en: 'Repo' }, url: 'https://github.com/DiegoOF07/generador-sintactico' }],
    },
  },
  {
    slug: 'graficas-rust',
    title: { es: 'Serie de gráficas por computadora en Rust', en: 'Computer graphics series in Rust' },
    description: {
      es: 'Tres renderizadores escritos desde cero: un juego en primera persona con raycasting, un raytracer de escenas de Minecraft con reflexión y refracción, y un sistema solar con shaders procedurales.',
      en: 'Three renderers written from scratch: a first-person raycasting game, a raytracer for Minecraft scenes with reflection and refraction, and a solar system with procedural shaders.',
    },
    techs: [
      { name: 'Rust', icon: rustLogo },
      { name: 'raylib', icon: raylibLogo },
    ],
    media: {
      type: 'image',
      // Fotograma del video del raytracer, servido local en vez de enlazado a YouTube
      src: graficasRust,
      alt: {
        es: 'Escena de Minecraft renderizada por el raytracer, con el contador de FPS, el tiempo de render y el modo multihilo sobre la imagen',
        en: 'Minecraft scene rendered by the raytracer, with the FPS counter, render time and multithreaded mode overlaid on the image',
      },
    },
    links: {},
    parts: [
      {
        name: { es: 'Raycaster', en: 'Raycaster' },
        repo: 'https://github.com/DiegoOF07/project1-graphics',
        video: 'https://www.youtube.com/watch?v=8QwW1_mKImg',
      },
      {
        name: { es: 'Raytracer', en: 'Raytracer' },
        repo: 'https://github.com/DiegoOF07/project2-graphics',
        video: 'https://youtu.be/k_zkKDIqTmM',
      },
      {
        name: { es: 'Sistema solar', en: 'Solar system' },
        repo: 'https://github.com/DiegoOF07/project3-graphics',
        video: 'https://www.youtube.com/watch?v=KpaX5xlLnqM',
      },
    ],
  },
  {
    slug: 'invitado-especial',
    title: { es: 'Invitado especial', en: 'Invitado especial' },
    description: {
      es: 'Juego creado en la Global Game Jam 2026: encontrar al invitado especial y desenmascararlo antes de que sea tarde.',
      en: 'A game made at Global Game Jam 2026: find the special guest and unmask them before it is too late.',
    },
    techs: [
      { name: 'TypeScript', icon: tsLogo },
      { name: 'Vue', icon: vueLogo },
      { name: 'Phaser', icon: phaserLogo },
    ],
    media: {
      type: 'image',
      // Copia local: la URL de la Global Game Jam lleva un token que caduca
      src: invitadoEspecial,
      alt: {
        es: 'Invitado especial: los sospechosos en una rueda de reconocimiento',
        en: 'Invitado especial: the suspects in a lineup',
      },
    },
    links: {
      demo: 'https://invitado-especial-game.netlify.app/',
      repos: [{ label: { es: 'Repo', en: 'Repo' }, url: 'https://github.com/DiegoOF07/ggj-2026' }],
    },
  },
]

// Utilidad para la página de detalle
export const getFeaturedProjectBySlug = (slug: string) =>
  featuredProjects.find((p) => p.slug === slug && p.hasDetail)
