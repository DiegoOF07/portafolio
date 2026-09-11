<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Github, Linkedin, Download } from 'lucide-vue-next'
import ProjectCard from '@/components/ProjectCard.vue'
import ExperimentCard from '@/components/ExperimentCard.vue'
import TechBadge from '@/components/TechBadge.vue'
import { featuredProjects, experimentProjects } from '@/data/projects'
import { stackGroups } from '@/data/stack'
import formPng from '@/assets/img/03_dapa-form.png'
import formAvif800 from '@/assets/img/hero/hero-form-800.avif'
import formAvif1340 from '@/assets/img/hero/hero-form-1340.avif'
import formWebp800 from '@/assets/img/hero/hero-form-800.webp'
import formWebp1340 from '@/assets/img/hero/hero-form-1340.webp'

const year = new Date().getFullYear()

// Captura del hero (constructor del formulario dinámico) en AVIF/WebP,
// con el PNG original como respaldo.
const heroSrcset = {
  avif: `${formAvif800} 800w, ${formAvif1340} 1340w`,
  webp: `${formWebp800} 800w, ${formWebp1340} 1340w`,
}
// Ocupa el ancho de la columna de contenido (máx. 1136px)
const HERO_SIZES = '(max-width: 600px) calc(100vw - 2rem), (max-width: 1200px) calc(100vw - 4rem), 1136px'

// La línea de traza arranca en el nodo del H1 del hero, no en el borde
// superior. Esa altura depende de la tipografía y de la carga de fuentes,
// así que se mide al montar y cada vez que cambia el layout.
const tracedEl = ref<HTMLElement | null>(null)
const traceStartEl = ref<HTMLElement | null>(null)
const traceStart = ref(0)
let layoutObserver: ResizeObserver | undefined

// Mismo valor que `top` de .trace-node::before (0.55em)
const NODE_OFFSET_EM = 0.55

// Distancia vertical de `el` al borde superior de `ancestor` según el layout
// (offsetTop). Ignora transforms, así que la animación de entrada del hero
// no altera la medición.
const offsetWithin = (el: HTMLElement, ancestor: HTMLElement) => {
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return y
}

const measureTraceStart = () => {
  const traced = tracedEl.value
  const start = traceStartEl.value
  if (!traced || !start) return
  traceStart.value = Math.round(
    offsetWithin(start, traced) + parseFloat(getComputedStyle(start).fontSize) * NODE_OFFSET_EM,
  )
}

onMounted(() => {
  measureTraceStart()
  if (tracedEl.value) {
    layoutObserver = new ResizeObserver(measureTraceStart)
    layoutObserver.observe(tracedEl.value)
  }
})

onBeforeUnmount(() => layoutObserver?.disconnect())
</script>

<template>
  <div class="home">
    <!-- La línea de traza recorre del hero a Experimentos y termina donde empieza el contacto -->
    <div ref="tracedEl" class="traced" :style="{ '--trace-start': `${traceStart}px` }">
      <div class="throughline" aria-hidden="true">
        <span class="throughline-fill"></span>
      </div>

      <!--  HERO: bloque tipográfico + evidencia real de trabajo  -->
      <section id="inicio" class="section hero">
        <div class="hero-copy">
          <span class="availability-badge">
            <span class="availability-dot"></span>
            Disponible para oportunidades remotas
          </span>
          <h1 ref="traceStartEl" class="trace-node">
            Diego Flores <span class="role">Full-Stack Developer</span>
          </h1>
          <p class="hero-lead">
            Construyo software completo para clientes reales, del modelo de datos a
            la interfaz y el despliegue, con curiosidad por entender cómo funcionan
            los sistemas por dentro.
          </p>
          <div class="hero-actions">
            <a href="#proyectos" class="btn-primary">Ver proyectos</a>
            <a href="mailto:floresdiego041@gmail.com" class="hero-link">Escríbeme</a>
            <a href="/cv-diego-flores.pdf" download class="hero-link">
              <Download :size="18" aria-hidden="true" /> Descargar CV
            </a>
          </div>
        </div>

        <figure class="hero-shot">
          <figcaption>
            En pantalla: el constructor de formularios dinámicos que desarrollé en equipo
            para una empresa de transporte. Las preguntas se crean sin tocar código y las
            respuestas generan las cotizaciones.
            <RouterLink to="/proyectos/dapa-logistica">Ver el proyecto</RouterLink>
          </figcaption>
          <div class="hero-shot-frame">
            <picture>
              <source type="image/avif" :srcset="heroSrcset.avif" :sizes="HERO_SIZES" />
              <source type="image/webp" :srcset="heroSrcset.webp" :sizes="HERO_SIZES" />
              <img
                :src="formPng"
                alt="Constructor del formulario dinámico: ventana para agregar una pregunta con su tipo, sus opciones y si es obligatoria"
                width="1340"
                height="949"
                fetchpriority="high"
              />
            </picture>
          </div>
        </figure>
      </section>

      <!-- SOBRE MÍ  -->
      <section id="sobre-mi" class="section">
        <h2 class="section-title trace-node">Sobre mí</h2>
        <div class="about-body">
          <img
            src="@/assets/img/profile.jpg"
            alt="Diego Flores"
            class="avatar"
            width="460"
            height="460"
            loading="lazy"
          />
          <div class="about-text">
            <p>
              Soy estudiante de Ingeniería en Ciencias de la Computación —llevo más de
              3 años en la carrera— y desarrollador full-stack, principalmente con Go,
              Vue y bases de datos relacionales y en grafos. Disfruto llevar proyectos
              de principio a fin, desde entender el problema de un cliente real hasta
              el despliegue.
            </p>
            <p>
              Lo complemento con curiosidad técnica hacia temas menos comunes: he
              construido un compilador básico, trabajado con sistemas operativos a bajo
              nivel y experimentado con gráficos 3D y raytracing. Creo que entender los
              fundamentos, no solo los frameworks, es lo que hace la diferencia a largo
              plazo.
            </p>
          </div>
        </div>
      </section>

      <!--  PROYECTOS DESTACADOS  -->
      <section id="proyectos" class="section">
        <h2 class="section-title trace-node">Proyectos destacados</h2>
        <div class="projects-list">
          <ProjectCard v-for="p in featuredProjects" :key="p.slug" :project="p" />
        </div>
      </section>

      <!--  STACK TÉCNICO  -->
      <section id="stack" class="section">
        <h2 class="section-title trace-node">Stack técnico</h2>
        <dl class="stack-list">
          <div v-for="group in stackGroups" :key="group.label" class="stack-row">
            <dt>{{ group.label }}</dt>
            <dd>
              <TechBadge v-for="tech in group.items" :key="tech.name" :name="tech.name" :icon="tech.icon" />
            </dd>
          </div>
        </dl>
      </section>

      <!--  EXPERIMENTALES  -->
      <section id="experimentos" class="section">
        <h2 class="section-title trace-node">Proyectos experimentales</h2>
        <div class="experiments-grid">
          <ExperimentCard v-for="p in experimentProjects" :key="p.slug" :project="p" />
        </div>
      </section>
    </div>

    <!--  CONTACTO: la única superficie cálida del sitio  -->
    <div class="warm">
      <section id="contacto" class="section contact">
        <div class="contact-main">
          <h2 class="section-title">Contacto</h2>
          <p class="contact-lead">
            Busco oportunidades remotas como desarrollador
            <span class="nowrap">full-stack</span>. Si algo de lo que viste encaja con
            lo que tu equipo está construyendo, escríbeme.
          </p>
          <a class="contact-email" href="mailto:floresdiego041@gmail.com">floresdiego041@gmail.com</a>
          <ul class="contact-links">
            <li>
              <a href="https://github.com/DiegoOF07" target="_blank" rel="noopener noreferrer">
                <Github :size="18" aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/diego-flores-gt" target="_blank" rel="noopener noreferrer">
                <Linkedin :size="18" aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="/cv-diego-flores.pdf" download>
                <Download :size="18" aria-hidden="true" /> Descargar CV
              </a>
            </li>
          </ul>
        </div>

        <dl class="contact-facts">
          <div>
            <dt>Ubicación</dt>
            <dd>Guatemala (GMT-6)</dd>
          </div>
          <div>
            <dt>Formación</dt>
            <dd>Ingeniería en Ciencias de la Computación</dd>
          </div>
        </dl>
      </section>

      <footer class="site-footer">
        <p>© {{ year }} Diego Flores</p>
        <a href="#inicio">Volver arriba</a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.home {
  /* La línea de traza vive en el margen: a --trace-inset del borde de la sección */
  --section-pad: 2rem;
  --trace-inset: 1rem;
  display: flex;
  flex-direction: column;
}

.section {
  padding: 4rem var(--section-pad);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  scroll-margin-top: 4.5rem;
}

.section-title {
  font-size: var(--step-4);
  margin: 0 0 var(--s-6);
}

/* ------------------------------------------------------------------
   Línea de traza: una arista que recorre la página. Su punta sigue el
   centro del viewport y cada título es un nodo que se rellena al
   alcanzarlo. Sin JS: scroll-driven animations. Sin soporte (o con
   movimiento reducido) la línea queda completa y los nodos rellenos.
   ------------------------------------------------------------------ */
.traced {
  position: relative;
}

/* Arranca en el nodo del hero (--trace-start) y no en el borde superior,
   para que no parezca continuar por debajo del navbar. */
.throughline {
  position: absolute;
  top: var(--trace-start, 0px);
  bottom: 0;
  left: calc(max(0px, 50% - 600px) + var(--trace-inset));
  width: 1px;
  background: var(--line);
  pointer-events: none;
}

.throughline-fill {
  display: block;
  height: 100%;
  background: color-mix(in srgb, var(--signal) 70%, transparent);
  transform-origin: top;
}

.traced .section {
  position: relative;
  z-index: 1;
}

/* Nodo sobre la línea, alineado con el título que lo lleva */
.trace-node {
  --node-x: calc(var(--trace-inset) - var(--section-pad) + 0.5px);
  position: relative;
}

.trace-node::before {
  content: '';
  position: absolute;
  top: 0.55em;
  left: var(--node-x);
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1.5px solid var(--signal);
  background: var(--signal);
  transform: translate(-50%, -50%);
}

@supports (animation-timeline: view()) {
  .throughline {
    view-timeline-name: --trace;
  }

  /* 0 cuando el inicio de la línea cruza el centro del viewport, 1 cuando cruza su final */
  .throughline-fill {
    animation: trace-draw linear both;
    animation-timeline: --trace;
    animation-range: cover 50vh cover calc(100% - 50vh);
  }

  .trace-node {
    view-timeline-name: --node;
  }

  .trace-node::before {
    animation: node-reach linear both;
    animation-timeline: --node;
    animation-range: cover 45% cover 50%;
  }
}

@keyframes trace-draw {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@keyframes node-reach {
  from {
    background: var(--field-navy);
    border-color: var(--ink-dim);
  }
  to {
    background: var(--signal);
    border-color: var(--signal);
  }
}

@media (prefers-reduced-motion: reduce) {
  .throughline-fill,
  .trace-node::before {
    animation: none;
  }
}

/* ------------------------------------------------------------------
   Hero: bloque tipográfico arriba y captura real abajo, que se
   desvanece hacia la siguiente sección. Un solo momento de movimiento
   orquestado al cargar; fuera de eso, nada se mueve solo.
   ------------------------------------------------------------------ */
.hero {
  padding-top: var(--s-8);
  padding-bottom: var(--s-6);
}

.hero-copy {
  max-width: 50rem;
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--signal);
  background: rgba(79, 209, 232, 0.08);
  border: 1px solid rgba(79, 209, 232, 0.28);
  margin-bottom: 1.25rem;
}

.availability-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--signal);
  box-shadow: 0 0 8px rgba(79, 209, 232, 0.7);
  animation: availability-pulse 2s ease-in-out infinite;
}

@keyframes availability-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .availability-dot {
    animation: none;
  }
}

.hero h1 {
  font-size: var(--step-5);
  line-height: 1;
  margin: 0 0 var(--s-5);
}

.role {
  display: block;
  margin-top: 0.3em;
  font-size: clamp(1.25rem, 0.95rem + 1.2vw, 1.75rem);
  font-weight: 500;
  font-stretch: 100%;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: var(--ink-dim);
}

.hero-lead {
  max-width: 56ch;
  margin: 0 0 var(--s-6);
  font-size: clamp(1.125rem, 1rem + 0.5vw, 1.3125rem);
  line-height: 1.55;
}

/* Una sola acción sólida; las otras dos son enlaces discretos */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-4) var(--s-6);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: 0.8rem 1.5rem;
  border-radius: var(--r-control);
  font-weight: 600;
  color: var(--signal-ink);
  background: var(--signal);
  transition: background 0.2s ease;
}

.btn-primary:hover {
  color: var(--signal-ink);
  background: color-mix(in srgb, var(--signal) 80%, white);
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--ink);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--ink) 30%, transparent);
  text-underline-offset: 0.3em;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.hero-link:hover {
  color: var(--signal);
  text-decoration-color: currentColor;
}

/* Captura: evidencia real del trabajo. Se corta con un desvanecido
   hacia abajo para invitar a seguir bajando. */
.hero-shot {
  margin: var(--s-8) 0 0;
}

.hero-shot figcaption {
  max-width: 62ch;
  margin-bottom: var(--s-3);
  font-size: var(--step--1);
  color: var(--ink-dim);
}

.hero-shot figcaption a {
  color: var(--signal);
  font-weight: 600;
  white-space: nowrap;
}

.hero-shot figcaption a:hover {
  color: var(--ink);
}

.hero-shot-frame {
  /* width explícito: si no, max-height encoge también el ancho por la proporción */
  width: 100%;
  aspect-ratio: 1340 / 949;
  max-height: 30rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--r-surface);
  background: #f7f7f7; /* el fondo de la propia captura, mientras carga */
  -webkit-mask-image: linear-gradient(to bottom, #000 62%, transparent);
  mask-image: linear-gradient(to bottom, #000 62%, transparent);
}

.hero-shot-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}

/* Secuencia de entrada: una sola vez, escalonada, y la captura al final */
@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.hero-copy > *,
.hero-shot {
  animation: hero-rise 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.hero-copy > :nth-child(2) { animation-delay: 90ms; }
.hero-copy > :nth-child(3) { animation-delay: 180ms; }
.hero-copy > :nth-child(4) { animation-delay: 260ms; }

.hero-shot {
  animation-duration: 1000ms;
  animation-delay: 380ms;
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy > *,
  .hero-shot {
    animation: none;
  }
}

/* Sobre mí */
.about-body {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: var(--s-7);
  align-items: start;
}

.avatar {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: var(--r-control);
  border: 1px solid var(--line);
}

.about-text p {
  max-width: 62ch;
  margin: 0 0 var(--s-4);
  font-size: var(--step-1);
}

.about-text p:last-child {
  margin-bottom: 0;
}

/* Proyectos */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Stack: una fila por grupo, etiqueta a la izquierda */
.stack-list {
  margin: 0;
  border-top: 1px solid var(--line);
}

.stack-row {
  display: grid;
  grid-template-columns: 14rem minmax(0, 1fr);
  gap: var(--s-5);
  align-items: center;
  padding-block: var(--s-5);
  border-bottom: 1px solid var(--line);
}

.stack-row dt {
  font-weight: 600;
  color: var(--ink-dim);
}

.stack-row dd {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

/* Experimentales */
.experiments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Contacto — banda cálida */
/* El degradado deja que las esferas del fondo se fundan en la banda
   en lugar de cortarse contra un plano. */
.warm {
  background: linear-gradient(to bottom, transparent, var(--warm-surface) 180px);
  color: var(--warm-ink);
}

.contact {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: var(--s-8);
  align-items: end;
  padding-block: var(--s-9) var(--s-8);
}

.contact .section-title {
  color: var(--warm-ink);
}

.contact-lead {
  max-width: 52ch;
  margin: 0 0 var(--s-6);
  font-size: var(--step-1);
}

.nowrap {
  white-space: nowrap;
}

.contact-email {
  font-family: var(--font-display);
  font-stretch: 112%;
  font-weight: 700;
  font-size: clamp(1.25rem, 0.8rem + 2.6vw, 2.5rem);
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--signal);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.18em;
  overflow-wrap: anywhere;
  transition: color 0.2s ease;
}

.contact-email:hover {
  color: var(--warm-ink);
}

.contact-links {
  list-style: none;
  padding: 0;
  margin: var(--s-6) 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3) var(--s-6);
}

.contact-links a {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--warm-ink);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--warm-line);
  text-underline-offset: 0.25em;
  transition: text-decoration-color 0.2s ease;
}

.contact-links a:hover {
  text-decoration-color: currentColor;
}

.contact-facts {
  margin: 0;
  display: grid;
  gap: var(--s-5);
  padding-left: var(--s-6);
  border-left: 1px solid var(--warm-line);
}

.contact-facts dt {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--warm-ink-dim);
}

.contact-facts dd {
  margin: 0;
}

.site-footer {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--s-5) 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--s-4);
  border-top: 1px solid var(--warm-line);
  font-size: var(--step--1);
  color: var(--warm-ink-dim);
}

.site-footer p {
  margin: 0;
}

.site-footer a {
  color: var(--warm-ink);
  font-weight: 600;
}

.site-footer a:hover {
  color: var(--signal);
}

/* Responsive */
@media (max-width: 895px) {
  .contact {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--s-7);
  }

  .contact-facts {
    padding: var(--s-5) 0 0;
    border-left: none;
    border-top: 1px solid var(--warm-line);
  }
}

@media (max-width: 700px) {
  .about-body {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--s-5);
  }

  .avatar {
    width: 120px;
    height: 120px;
  }

  .stack-row {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--s-3);
  }
}

@media (max-width: 600px) {
  .home {
    --section-pad: 1rem;
    --trace-inset: 0.5rem;
  }

  .section {
    padding: 3rem var(--section-pad);
  }

  .hero {
    padding-top: var(--s-7);
  }

  .hero-shot {
    margin-top: var(--s-7);
  }

  .hero-shot-frame {
    max-height: 16rem;
    border-radius: var(--r-control);
  }

  .contact {
    padding-block: var(--s-8) var(--s-7);
  }

  .site-footer {
    padding-inline: 1rem;
  }
}
</style>
