const es = {
  meta: {
    title: 'Diego Flores — Full-Stack Developer',
    description:
      'Portafolio de Diego Flores, desarrollador full-stack (Go, Vue, TypeScript, PostgreSQL). Proyectos en equipo con clientes reales y herramientas propias. Disponible para oportunidades remotas.',
  },
  nav: {
    inicio: 'Inicio',
    'sobre-mi': 'Sobre mí',
    proyectos: 'Proyectos',
    stack: 'Stack',
    experimentos: 'Experimentos',
    contacto: 'Contacto',
    downloadCv: 'Descargar CV',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLabel: 'EN',
    switchAria: 'Read this site in English',
  },
  automap: {
    label: 'Mapa del sitio',
    wall: 'Una pared que suena hueca',
    secretRoom: 'Secreto',
  },
  hero: {
    availability: 'Disponible para oportunidades remotas',
    role: 'Full-Stack Developer',
    lead: 'Construyo software completo, del modelo de datos a la interfaz y el despliegue, con curiosidad por entender cómo funcionan los sistemas por dentro.',
    seeProjects: 'Ver proyectos',
    writeMe: 'Escríbeme',
    downloadCv: 'Descargar CV',
    caption:
      'En pantalla: el constructor de formularios dinámicos que desarrollé en equipo para una empresa de transporte. Las preguntas se crean sin tocar código y las respuestas generan las cotizaciones.',
    seeProject: 'Ver el proyecto',
    shotAlt:
      'Constructor del formulario dinámico: ventana para agregar una pregunta con su tipo, sus opciones y si es obligatoria',
  },
  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Estudio Ingeniería en Ciencias de la Computación en la Universidad del Valle de Guatemala y soy desarrollador full-stack, principalmente con Go, Vue y bases de datos relacionales y en grafos. En la universidad trabajé en equipo con dos clientes reales, una empresa de transporte y una ONG, desde entender su problema hasta el despliegue.',
      'Fuera de clase desarrollo herramientas propias como DiskFlow, con CI, pruebas y releases publicados. Lo complemento con curiosidad por temas menos comunes: construir un compilador básico, trabajar con sistemas operativos a bajo nivel o escribir un raytracer desde cero. Creo que entender los fundamentos, no solo los frameworks, es lo que hace la diferencia a largo plazo.',
    ],
  },
  sections: {
    projects: 'Proyectos destacados',
    stack: 'Stack técnico',
    experiments: 'Proyectos experimentales',
  },
  project: {
    challenge: 'Reto técnico',
    seeProject: 'Ver el proyecto',
    seeDemo: 'Ver demo',
    back: 'Volver a proyectos',
    context: 'Contexto',
    status: 'Estado',
    stats: 'Datos clave',
    diagramRegion: 'Diagrama de arquitectura',
    diagramHint: 'Desliza para recorrer el diagrama',
    diagramOpen: 'Abrir a tamaño completo',
    gallery: 'Galería del proyecto',
    fullscreen: 'Pantalla completa',
    fullscreenAria: (n: number) => `Ver imagen ${n} en pantalla completa`,
    goToImage: (n: number) => `Ir a imagen ${n}`,
    notFound: 'Proyecto no encontrado.',
  },
  contact: {
    title: 'Contacto',
    // U+2011: guion no separable
    lead: 'Busco oportunidades remotas como desarrollador full‑stack. Si algo de lo que viste encaja con lo que tu equipo está construyendo, escríbeme.',
    copy: 'Copiar',
    copied: 'Copiado',
    downloadCv: 'Descargar CV',
    otherCv: 'CV en inglés',
    location: 'Ubicación',
    education: 'Formación',
    educationValue: 'Ingeniería en Ciencias de la Computación',
    backToTop: 'Volver arriba',
  },
}

const en: typeof es = {
  meta: {
    title: 'Diego Flores — Full-Stack Developer',
    description:
      'Portfolio of Diego Flores, full-stack developer (Go, Vue, TypeScript, PostgreSQL). Team projects with real clients and tools of my own. Open to remote opportunities.',
  },
  nav: {
    inicio: 'Home',
    'sobre-mi': 'About',
    proyectos: 'Projects',
    stack: 'Stack',
    experimentos: 'Experiments',
    contacto: 'Contact',
    downloadCv: 'Download résumé',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLabel: 'ES',
    switchAria: 'Ver el sitio en español',
  },
  automap: {
    label: 'Site map',
    wall: 'A wall that sounds hollow',
    secretRoom: 'Secret',
  },
  hero: {
    availability: 'Open to remote opportunities',
    role: 'Full-Stack Developer',
    lead: 'I build complete software, from the data model to the interface and deployment, with a curiosity for how systems work on the inside.',
    seeProjects: 'See projects',
    writeMe: 'Get in touch',
    downloadCv: 'Download résumé',
    caption:
      'On screen: the dynamic form builder I developed with my team for a transportation company. Questions are created without touching code, and the answers generate the price quotes.',
    seeProject: 'See the project',
    shotAlt:
      'Dynamic form builder: dialog for adding a question with its type, its options and whether it is required',
  },
  about: {
    title: 'About me',
    paragraphs: [
      'I study Computer Science at Universidad del Valle de Guatemala and work as a full-stack developer, mostly with Go, Vue, and relational and graph databases. At university I worked in teams with two real clients, a transportation company and a non-profit, from understanding their problem through to deployment.',
      'Outside class I build my own tools, like DiskFlow, with CI, tests and published releases. I round that out with curiosity for less common topics: building a basic compiler, working with operating systems at a low level, or writing a raytracer from scratch. I believe understanding the fundamentals, not just the frameworks, is what makes the difference in the long run.',
    ],
  },
  sections: {
    projects: 'Featured projects',
    stack: 'Tech stack',
    experiments: 'Experimental projects',
  },
  project: {
    challenge: 'Technical challenge',
    seeProject: 'See the project',
    seeDemo: 'Live demo',
    back: 'Back to projects',
    context: 'Context',
    status: 'Status',
    stats: 'Key figures',
    diagramRegion: 'Architecture diagram',
    diagramHint: 'Swipe to explore the diagram',
    diagramOpen: 'Open full size',
    gallery: 'Project gallery',
    fullscreen: 'Full screen',
    fullscreenAria: (n: number) => `View image ${n} in full screen`,
    goToImage: (n: number) => `Go to image ${n}`,
    notFound: 'Project not found.',
  },
  contact: {
    title: 'Contact',
    lead: "I'm looking for remote opportunities as a full‑stack developer. If something you saw fits what your team is building, get in touch.",
    copy: 'Copy',
    copied: 'Copied',
    downloadCv: 'Download résumé',
    otherCv: 'Résumé in Spanish',
    location: 'Location',
    education: 'Education',
    educationValue: 'B.S. in Computer Science',
    backToTop: 'Back to top',
  },
}

export const messages = { es, en }
