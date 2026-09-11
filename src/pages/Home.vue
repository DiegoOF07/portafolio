<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Github, Linkedin, Download } from 'lucide-vue-next'
import ProjectCard from '@/components/ProjectCard.vue'
import ExperimentCard from '@/components/ExperimentCard.vue'
import TechBadge from '@/components/TechBadge.vue'
import { featuredProjects, experimentProjects } from '@/data/projects'
import { stackGroups } from '@/data/stack'

const year = new Date().getFullYear()

// La línea de traza arranca en el nodo del H1 del hero, no en el borde
// superior. Esa altura depende del centrado del hero y de la carga de
// fuentes, así que se mide al montar y cada vez que cambia el layout.
const tracedEl = ref<HTMLElement | null>(null)
const traceStartEl = ref<HTMLElement | null>(null)
const traceStart = ref(0)
let layoutObserver: ResizeObserver | undefined

// Mismo valor que `top` de .trace-node::before (0.55em)
const NODE_OFFSET_EM = 0.55

const measureTraceStart = () => {
  const traced = tracedEl.value
  const start = traceStartEl.value
  if (!traced || !start) return
  const nodeY =
    start.getBoundingClientRect().top + parseFloat(getComputedStyle(start).fontSize) * NODE_OFFSET_EM
  traceStart.value = Math.round(nodeY - traced.getBoundingClientRect().top)
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

      <!--  HERO  -->
      <section id="inicio" class="section hero-section">
        <div class="hero-glass-card">
          <span class="availability-badge">
            <span class="availability-dot"></span>
            Disponible para oportunidades remotas
          </span>
          <h1 ref="traceStartEl" class="trace-node">
            Diego Flores <span class="role">Full-Stack Developer</span>
          </h1>
          <p class="description">
            Construyo productos completos, del backend a la base de datos,
            con curiosidad por entender cómo funcionan los sistemas por dentro.
          </p>
          <div class="hero-actions">
            <a href="#proyectos" class="btn-hero-primary">Ver proyectos</a>
            <a href="mailto:floresdiego041@gmail.com" class="btn-hero-secondary">Escríbeme</a>
            <a href="/cv-diego-flores.pdf" download class="btn-hero-secondary">
              <Download :size="18" /> Descargar CV
            </a>
          </div>
        </div>
        <img src="../assets/Developer activity-bro.svg" alt="Developer" class="hero-img" />
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

/* Nodo sobre la línea. Por defecto se alinea con un título de sección;
   en el hero se corre además el padding y el borde de la tarjeta. */
.trace-node {
  --node-x: calc(var(--trace-inset) - var(--section-pad) + 0.5px);
  position: relative;
}

.hero-glass-card .trace-node {
  --node-x: calc(var(--trace-inset) - var(--section-pad) - 2.5rem - 1px + 0.5px);
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

/* Hero */
.hero-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  min-height: 70vh;
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

.hero-glass-card {
  flex: 1 1 400px;
  backdrop-filter: blur(12px);
  background: var(--hero-glass-bg);
  border: var(--hero-glass-border);
  border-radius: 2rem;
  padding: 2.5rem;
  box-shadow: var(--hero-glass-shadow);
}

.hero-glass-card h1 {
  font-size: clamp(2.25rem, 1.4rem + 3vw, 3.25rem);
  margin: 0 0 var(--s-5);
}

.role {
  display: block;
  margin-top: 0.35em;
  font-size: 0.5em;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: var(--ink-dim);
}

.hero-glass-card .description {
  max-width: var(--measure);
  margin-bottom: var(--s-5);
  font-size: var(--step-1);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-hero-primary,
.btn-hero-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: var(--r-control);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.btn-hero-primary {
  color: var(--signal-ink);
  background: var(--signal);
  border: 1px solid var(--signal);
}

.btn-hero-primary:hover {
  color: var(--signal-ink);
  background: color-mix(in srgb, var(--signal) 80%, white);
  border-color: color-mix(in srgb, var(--signal) 80%, white);
}

.btn-hero-secondary {
  color: var(--ink);
  background: var(--btn-glass-bg);
  border: var(--btn-glass-border);
  backdrop-filter: blur(8px);
}

.btn-hero-secondary:hover {
  color: var(--ink);
  background: var(--btn-glass-hover-bg);
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-img {
  max-width: 380px;
  width: 100%;
  flex-shrink: 0;
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
  .hero-section {
    justify-content: center;
    text-align: center;
  }

  .hero-actions {
    justify-content: center;
  }

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

  .contact {
    padding-block: var(--s-8) var(--s-7);
  }

  .site-footer {
    padding-inline: 1rem;
  }
}
</style>
