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
import mcpArquitecturaEs from '@/assets/img/mcp-arquitectura.es.svg'
import mcpArquitecturaEn from '@/assets/img/mcp-arquitectura.en.svg'
import diskflowArquitecturaEs from '@/assets/img/diskflow-arquitectura.es.svg'
import diskflowArquitecturaEn from '@/assets/img/diskflow-arquitectura.en.svg'
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
  // diagram: imagen con texto que en móvil se recorre en vez de encogerse
  type: 'image' | 'gif' | 'video' | 'diagram'
  // Localizado solo si la imagen tiene texto
  src: string | Localized
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
  // Al final de la sección, en formato reducido
  compact?: boolean
  // Se deriva del contenido (ver withDerivedDetail): true solo si el
  // detalle tiene galería o descripción, para no enlazar a una página vacía.
  hasDetail: boolean
  detail?: {
    gallery: MediaAsset[]
    stats?: { value: string; label: Localized }[]
    // Párrafos del cuerpo separados por una línea en blanco
    sections?: { heading: Localized; body: Localized }[]
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
  hasDetail: Boolean(p.detail && (p.detail.gallery.length > 0 || p.detail.sections?.length)),
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
      stats: [
        { value: '~1 año', label: { es: 'de desarrollo en equipo', en: 'of team development' } },
        { value: '5', label: { es: 'módulos de gestión', en: 'management modules' } },
        { value: 'Scrum', label: { es: 'con sprints en Jira', en: 'with sprints in Jira' } },
      ],
      sections: [
        {
          heading: { es: 'Qué problema resuelve', en: 'The problem it solves' },
          body: {
            es: 'Una empresa de transporte real necesitaba administrar su operación en un solo lugar. El sistema cubre la gestión de vehículos, conductores, cotizaciones, pedidos y mantenimiento preventivo, con control de acceso por roles. Un dashboard centralizado muestra KPIs operativos, alertas de mantenimiento y métricas de eficiencia de la flota.',
            en: 'A real transportation company needed to run its operation from a single place. The system covers vehicles, drivers, quotes, orders and preventive maintenance, with role-based access control. A central dashboard shows operational KPIs, maintenance alerts and fleet efficiency metrics.',
          },
        },
        {
          heading: { es: 'Arquitectura', en: 'Architecture' },
          body: {
            es: 'Un backend en Go y un frontend en Vue, con PostgreSQL como base de datos principal. Todo se orquesta con Docker para que el entorno sea el mismo en cada máquina del equipo y en el despliegue, que se hizo en AWS.',
            en: 'A Go backend and a Vue frontend, with PostgreSQL as the main database. Everything is orchestrated with Docker so the environment is the same on every team member\'s machine and in the deployment, which ran on AWS.',
          },
        },
        {
          heading: { es: 'El cotizador dinámico', en: 'The dynamic quoting system' },
          body: {
            es: 'Es el componente más innovador: un subsistema donde el administrador puede crear, editar o eliminar preguntas del formulario de cotización sin tocar código. Las respuestas de los clientes generan automáticamente cotizaciones para que el administrador las revise y decida qué hacer con cada una.',
            en: 'This is the most innovative piece: a subsystem where the administrator can create, edit or remove questions on the quote form without touching code. Client answers automatically generate quotes for the administrator to review and decide on.',
          },
        },
        {
          heading: { es: 'Cómo se trabajó', en: 'How we worked' },
          body: {
            es: 'Lo desarrollamos en equipo durante aproximadamente un año, con Scrum y Jira para organizar los sprints, y en contacto con el cliente para validar los requerimientos a lo largo del proyecto.',
            en: 'We built it as a team over roughly one year, using Scrum with Jira to organize the sprints, and stayed in touch with the client to validate requirements throughout the project.',
          },
        },
      ],
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
    media: {
      type: 'diagram',
      src: { es: diskflowArquitecturaEs, en: diskflowArquitecturaEn },
      alt: {
        es: 'Diagrama en tres capas: el frontend en Vue habla con una interfaz Backend implementada sobre los bindings de wailsjs; los comandos bajan al adaptador internal/desktop, el único paquete que importa Wails, y los eventos de progreso suben; el adaptador llama directamente al motor en Go, donde el escáner alimenta el índice que se guarda en SQLite',
        en: 'Three-layer diagram: the Vue frontend talks to a Backend interface implemented on top of the wailsjs bindings; commands go down to the internal/desktop adapter, the only package that imports Wails, and progress events come back up; the adapter calls the Go engine directly, where the scanner feeds the index stored in SQLite',
      },
    },
    detail: {
      gallery: [],
      stats: [
        { value: '~100k', label: { es: 'entradas indexadas', en: 'entries indexed' } },
        { value: '~2.4 s', label: { es: 'por escaneo, sobre NTFS', en: 'per scan, on NTFS' } },
        { value: '<10 MB', label: { es: 'de heap', en: 'of heap' } },
        { value: '3', label: { es: 'ADRs documentados', en: 'documented ADRs' } },
      ],
      sections: [
        {
          heading: { es: 'Qué problema resuelve', en: 'The problem it solves' },
          body: {
            es: 'En un workspace de desarrollo el espacio se va en lugares que no se ven: carpetas node_modules repetidas en cada proyecto, artefactos de build y cachés de herramientas. Un explorador de disco genérico muestra que una carpeta pesa mucho, pero no ayuda a entender por qué. DiskFlow escanea una carpeta, guarda el resultado en un índice local y lo muestra como un treemap y una tabla sincronizados: al pasar el cursor por uno se resalta el elemento en el otro, y se puede entrar en cualquier carpeta.\n\nEs de solo lectura por diseño: nunca borra, mueve ni abre archivos, y no hace peticiones de red. Qué limpiar lo decide quien lo usa.',
            en: 'In a development workspace, space goes to places you do not see: node_modules folders repeated in every project, build artifacts and tool caches. A generic disk explorer shows that a folder is heavy but does not help you understand why. DiskFlow scans a folder, stores the result in a local index and shows it as a synchronized treemap and table: hovering in one highlights the item in the other, and you can drill down into any folder.\n\nIt is read-only by design: it never deletes, moves or opens files, and it makes no network requests. What to clean up is left to the user.',
          },
        },
        {
          heading: { es: 'Arquitectura', en: 'Architecture' },
          body: {
            es: 'Son tres capas con fronteras explícitas. El motor de escaneo (internal/engine) es Go puro y no sabe que existe una interfaz: escanea, indexa en SQLite y responde consultas. Wails está confinado a un solo paquete adaptador (internal/desktop), el único que lo importa. Y el frontend en Vue nunca toca los bindings generados: depende de una interfaz Backend, y solo frontend/src/backend/ sabe que del otro lado está Wails.\n\nLa comunicación son comandos (StartScan, CancelScan, Children) y dos eventos: scan:progress, limitado a 10 por segundo para no saturar la interfaz, y scan:done con el resumen. Las consultas siempre van paginadas, así que la interfaz nunca recibe el índice completo.\n\nAntes de elegir Wails prototipé dos opciones con el mismo motor y la misma interfaz, cambiando solo el adaptador. Tauri 2 con el motor como proceso aparte aislaba mejor los fallos, pero necesitaba unas 350 líneas de integración con tipos escritos a mano, contra unas 100 con Wails, y compilaba en ~380 s en frío frente a ~35 s. Esa comparación quedó registrada en un ADR, igual que la decisión de usar SQLite con un driver en Go puro (sin CGO, así que no hace falta un compilador de C en Windows) y sin ORM.',
            en: 'There are three layers with explicit boundaries. The scan engine (internal/engine) is pure Go and has no idea there is a UI: it scans, indexes into SQLite and answers queries. Wails is confined to a single adapter package (internal/desktop), the only one that imports it. And the Vue frontend never touches the generated bindings: it depends on a Backend interface, and only frontend/src/backend/ knows that Wails is on the other side.\n\nCommunication is a set of commands (StartScan, CancelScan, Children) and two events: scan:progress, capped at 10 per second so it does not flood the UI, and scan:done with the summary. Queries are always paginated, so the UI never receives the whole index.\n\nBefore choosing Wails I prototyped two options with the same engine and the same UI, changing only the adapter. Tauri 2 with the engine as a separate process isolated failures better, but it needed about 350 lines of integration code with hand-written types, against about 100 with Wails, and took ~380 s for a cold build versus ~35 s. That comparison is recorded in an ADR, as is the decision to use SQLite with a pure-Go driver (no CGO, so no C compiler is needed on Windows) and no ORM.',
          },
        },
        {
          heading: { es: 'Rendimiento', en: 'Performance' },
          body: {
            es: 'El motor indexó ~100k entradas en unos 2.4 s sobre NTFS con menos de 10 MB de heap. La medición se hace sin la interfaz, con diskflow-cli: un comando genera un árbol sintético con el número de entradas que se pida, otro lo escanea y reporta los tiempos, y un tercero lista los directorios más grandes del índice. Así el número se puede reproducir y comparar entre cambios.\n\nEl límite conocido es la escritura: SQLite admite un solo escritor, así que agregar workers de escaneo apenas mejora el resultado. Por eso las inserciones van en lotes dentro de transacciones, y cualquier optimización adicional tiene que venir respaldada por un perfil.',
            en: 'The engine indexed ~100k entries in about 2.4 s on NTFS using under 10 MB of heap. It is measured without the UI, through diskflow-cli: one command generates a synthetic tree with as many entries as you ask for, another scans it and reports timings, and a third lists the largest directories in the index. That makes the number reproducible and comparable across changes.\n\nThe known limit is writing: SQLite allows a single writer, so adding scan workers barely helps. That is why inserts are batched inside transactions, and any further optimization has to be backed by a profile.',
          },
        },
        {
          heading: { es: 'Prácticas de ingeniería', en: 'Engineering practices' },
          body: {
            es: 'Cada cambio pasa por CI en GitHub Actions: gofmt, go vet y las pruebas del backend, también con el detector de condiciones de carrera, y del lado del frontend lint, formato, pruebas unitarias con Vitest y build con verificación de tipos. Un workflow semanal corre govulncheck y pnpm audit.\n\nLos releases se publican solos al empujar un tag: el workflow compila en Windows, genera el instalador y el ejecutable portable, y publica los checksums junto con una atestación de procedencia del build. Los tags con sufijo, como el actual v0.1.0-rc.1, salen como pre-release.',
            en: 'Every change goes through CI on GitHub Actions: gofmt, go vet and the backend tests, also under the race detector, and on the frontend side lint, formatting, unit tests with Vitest and a type-checked build. A weekly workflow runs govulncheck and pnpm audit.\n\nReleases publish themselves when a tag is pushed: the workflow builds on Windows, produces the installer and the portable executable, and publishes the checksums along with a build provenance attestation. Tags with a suffix, like the current v0.1.0-rc.1, ship as pre-releases.',
          },
        },
        {
          heading: { es: 'Limitaciones y roadmap', en: 'Limitations and roadmap' },
          body: {
            es: 'Por ahora solo funciona en Windows 10/11 x64, y los tamaños son lógicos, no en disco: los archivos dispersos, comprimidos o que solo existen en la nube (OneDrive) cuentan con su tamaño completo, así que el total puede superar el uso real. Los binarios todavía no están firmados, por lo que SmartScreen muestra una advertencia la primera vez.\n\nLa v0.2 contempla tamaños en disco, carpetas guardadas, búsqueda, «Mostrar en el Explorador» y «Copiar ruta», y estados de error más claros. Más adelante: exclusiones definidas por el usuario, categorías por tipo de archivo y exportación a JSON/CSV.',
            en: 'For now it only runs on Windows 10/11 x64, and sizes are logical, not on-disk: sparse, compressed and cloud-only (OneDrive) files count at their full size, so totals can exceed real disk usage. The binaries are not code-signed yet, so SmartScreen shows a warning on first run.\n\nv0.2 plans on-disk sizes, saved folders, search, "Show in Explorer" and "Copy path", and clearer error states. Later: user-defined exclusions, file-type categories and export to JSON/CSV.',
          },
        },
      ],
    },
    // TODO: video del treemap y la tabla (MP4/WebM en loop) en la galería
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
      type: 'diagram',
      src: { es: mcpArquitecturaEs, en: mcpArquitecturaEn },
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
      stats: [
        { value: '5', label: { es: 'herramientas MCP', en: 'MCP tools' } },
        { value: '0', label: { es: 'SDKs de MCP', en: 'MCP SDKs' } },
        { value: '2', label: { es: 'transportes: stdio y HTTP', en: 'transports: stdio and HTTP' } },
        { value: '5', label: { es: 'plataformas con binario', en: 'platforms with binaries' } },
      ],
      sections: [
        {
          heading: { es: 'Qué problema resuelve', en: 'The problem it solves' },
          body: {
            es: 'El sistema son dos programas que se hablan por el Model Context Protocol. El servidor, en Go, expone cinco herramientas sobre la base de datos de un restaurante: buscar platillos, buscar ingredientes con sus alérgenos, consultar la receta de un platillo, calcular cuántas porciones alcanzan con el inventario actual y registrar ajustes de stock. El cliente, en TypeScript, conecta un modelo de lenguaje con esos servidores y le deja decidir qué preguntar; se maneja desde una terminal o desde una interfaz web, y las dos muestran en vivo cada llamada del protocolo.',
            en: "The system is two programs that talk to each other over the Model Context Protocol. The server, written in Go, exposes five tools over a restaurant's database: searching dishes, searching ingredients with their allergens, looking up a dish's recipe, computing how many portions the current inventory allows, and recording stock adjustments. The client, written in TypeScript, connects a language model to those servers and lets it decide what to ask; it runs from a terminal or a web interface, and both show every protocol call live.",
          },
        },
        {
          heading: { es: 'El protocolo, escrito a mano', en: 'The protocol, written by hand' },
          body: {
            es: 'Ninguno de los dos usa el SDK de MCP. El protocolo está implementado a mano en ambos lados: el framing de JSON-RPC 2.0, el handshake de initialize con negociación de versión, la correlación de peticiones y respuestas por id, la paginación y los códigos de error estándar. La razón de hacerlo así fue entender el protocolo en lugar de consumirlo, y el efecto secundario es saber exactamente qué pasa cuando el handshake falla o cuando llega una respuesta sin petición.',
            en: 'Neither of them uses the MCP SDK. The protocol is implemented by hand on both sides: JSON-RPC 2.0 framing, the initialize handshake with version negotiation, request/response correlation by id, pagination and the standard error codes. The reason was to understand the protocol rather than just consume it, and the side effect is knowing exactly what happens when the handshake fails or a response arrives with no matching request.',
          },
        },
        {
          heading: { es: 'Arquitectura del cliente', en: 'Client architecture' },
          body: {
            es: 'Lo interesante es que no está atado a este servidor. Los servidores se declaran en un archivo de configuración y sus herramientas se fusionan en un único catálogo que se le ofrece al modelo; si dos servidores exponen una herramienta con el mismo nombre, el cliente falla de forma explícita en vez de elegir uno en silencio. Habla igual con un servidor local levantado como subproceso que con uno remoto por HTTP con token, que es como están tomadas las capturas. El proveedor del modelo también está detrás de una interfaz, así que cambiarlo no toca la lógica del protocolo, y existe un proveedor de demostración que ejercita todo el flujo sin necesidad de una API key.',
            en: 'The interesting part is that it is not tied to this server. Servers are declared in a configuration file and their tools are merged into a single catalog offered to the model; if two servers expose a tool with the same name, the client fails explicitly instead of silently picking one. It talks the same way to a local server spawned as a subprocess and to a remote one over HTTP with a token, which is how the screenshots were taken. The model provider also sits behind an interface, so swapping it does not touch the protocol logic, and a demo provider exercises the whole flow without needing an API key.',
          },
        },
        {
          heading: { es: 'Arquitectura del servidor', en: 'Server architecture' },
          body: {
            es: 'La decisión de diseño es que el modelo no es la autoridad. Antes de una operación que modifica datos el cliente pide confirmación explícita al usuario, y el servidor vuelve a verificar el rol por su cuenta: los permisos se evalúan antes de ejecutar el handler y fallan cerrados. Las restricciones de inventario viven en el esquema de la base y cada ajuste lleva una clave de idempotencia para que reintentar una llamada no descuente dos veces.',
            en: 'The design decision is that the model is not the authority. Before an operation that modifies data, the client asks the user for explicit confirmation, and the server checks the role again on its own: permissions are evaluated before the handler runs and fail closed. Inventory constraints live in the database schema, and every adjustment carries an idempotency key so that retrying a call never deducts twice.',
          },
        },
        {
          heading: { es: 'Distribución', en: 'Distribution' },
          body: {
            es: 'El servidor usa SQLite con un driver escrito en Go puro, así que compila sin C y se distribuye como un binario estático: el release publica binarios para Windows, macOS Intel y Apple Silicon, y Linux en amd64 y arm64, con sus checksums.',
            en: 'The server uses SQLite with a pure-Go driver, so it builds without C and ships as a static binary: the release publishes binaries for Windows, macOS on Intel and Apple Silicon, and Linux on amd64 and arm64, with their checksums.',
          },
        },
      ],
    },
  },
  {
    slug: 'recomendador-peliculas',
    compact: true,
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
    compact: true,
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
