<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { Github, Linkedin, Download, Copy, Check } from 'lucide-vue-next'
import ProjectCard from '@/components/ProjectCard.vue'
import ExperimentCard from '@/components/ExperimentCard.vue'
import TechBadge from '@/components/TechBadge.vue'
import { featuredProjects, experimentProjects } from '@/data/projects'
import { stackGroups } from '@/data/stack'
import { useLocale, projectRoute, CV_FILES } from '@/i18n'
import formPng from '@/assets/img/03_dapa-form.png'
import formAvif800 from '@/assets/img/hero/hero-form-800.avif'
import formAvif1340 from '@/assets/img/hero/hero-form-1340.avif'
import formWebp800 from '@/assets/img/hero/hero-form-800.webp'
import formWebp1340 from '@/assets/img/hero/hero-form-1340.webp'

const year = new Date().getFullYear()
const { locale, m, t } = useLocale()
const otherCv = computed(() => CV_FILES[locale.value === 'es' ? 'en' : 'es'])

// Copiar el correo: un mailto: no hace nada si el visitante no tiene cliente
// de correo configurado, y el contacto es el objetivo de la página.
const EMAIL = 'floresdiego041@gmail.com'
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Si el navegador lo bloquea, la dirección sigue visible y seleccionable.
  }
}

// La pieza principal va grande; el resto, en una lista más ligera
const leadProject = featuredProjects.find((p) => p.lead)
const rowProjects = featuredProjects.filter((p) => !p.lead && !p.compact)
const compactProjects = featuredProjects.filter((p) => p.compact)

// Captura del hero (constructor del formulario dinámico) en AVIF/WebP,
// con el PNG original como respaldo.
const heroSrcset = {
  avif: `${formAvif800} 800w, ${formAvif1340} 1340w`,
  webp: `${formWebp800} 800w, ${formWebp1340} 1340w`,
}
// Ocupa el ancho de la columna de contenido (máx. 1136px)
const HERO_SIZES = '(max-width: 600px) calc(100vw - 2rem), (max-width: 1200px) calc(100vw - 4rem), 1136px'

onBeforeUnmount(() => clearTimeout(copyTimer))
</script>

<template>
  <div class="home">
    <!--  HERO: bloque tipográfico + evidencia real de trabajo  -->
    <section id="inicio" class="section hero">
      <div class="hero-copy">
        <h1>
          Diego Flores <span class="role">{{ m.hero.role }}</span>
        </h1>
        <p class="hero-lead">{{ m.hero.lead }}</p>
        <div class="hero-actions">
          <a href="#proyectos" class="btn-primary">{{ m.hero.seeProjects }}</a>
          <!-- Lleva a la banda de contacto en vez de abrir mailto: si el
               visitante no tiene cliente de correo configurado, un mailto
               no hace nada y el botón parece roto. -->
          <a href="#contacto" class="link-quiet">{{ m.hero.writeMe }}</a>
          <a :href="CV_FILES[locale]" download class="link-quiet">
            <Download :size="18" aria-hidden="true" /> {{ m.hero.downloadCv }}
          </a>
        </div>
      </div>

      <figure class="hero-shot">
        <figcaption>
          {{ m.hero.caption }}
          <RouterLink :to="projectRoute(locale, 'dapa-logistica')">{{ m.hero.seeProject }}</RouterLink>
        </figcaption>
        <div class="hero-shot-frame">
          <picture>
            <source type="image/avif" :srcset="heroSrcset.avif" :sizes="HERO_SIZES" />
            <source type="image/webp" :srcset="heroSrcset.webp" :sizes="HERO_SIZES" />
            <img
              :src="formPng"
              :alt="m.hero.shotAlt"
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
      <h2 class="section-title">{{ m.about.title }}</h2>
      <div class="about-body">
        <img
          src="@/assets/img/profile.png"
          alt="Diego Flores"
          class="avatar"
          width="460"
          height="460"
          loading="lazy"
        />
        <div class="about-text">
          <p v-for="(paragraph, idx) in m.about.paragraphs" :key="idx">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <!--  PROYECTOS DESTACADOS  -->
    <section id="proyectos" class="section">
      <h2 class="section-title">{{ m.sections.projects }}</h2>
      <ProjectCard v-if="leadProject" :project="leadProject" />
      <div class="project-rows">
        <ProjectCard v-for="p in rowProjects" :key="p.slug" :project="p" />
      </div>
      <div v-if="compactProjects.length" class="project-compact">
        <ProjectCard v-for="p in compactProjects" :key="p.slug" :project="p" />
      </div>
    </section>

    <!--  STACK TÉCNICO  -->
    <section id="stack" class="section">
      <h2 class="section-title">{{ m.sections.stack }}</h2>
      <dl class="stack-list">
        <div v-for="group in stackGroups" :key="group.label.es" class="stack-row">
          <dt>{{ t(group.label) }}</dt>
          <dd>
            <TechBadge v-for="tech in group.items" :key="tech.name" :name="tech.name" :icon="tech.icon" />
          </dd>
        </div>
      </dl>
    </section>

    <!--  EXPERIMENTALES  -->
    <section id="experimentos" class="section">
      <h2 class="section-title">{{ m.sections.experiments }}</h2>
      <div class="experiments-grid">
        <ExperimentCard v-for="p in experimentProjects" :key="p.slug" :project="p" />
      </div>
    </section>

    <!--  CONTACTO  -->
    <div>
      <section id="contacto" class="section contact">
        <div class="contact-main">
          <h2 class="section-title">{{ m.contact.title }}</h2>
          <p class="contact-lead">{{ m.contact.lead }}</p>
          <!-- El mailto sigue ahí para quien tenga cliente de correo, pero
               copiar la dirección funciona siempre. -->
          <p class="contact-email-row">
            <a class="contact-email" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
            <button type="button" class="copy-btn" @click="copyEmail">
              <component :is="copied ? Check : Copy" :size="15" aria-hidden="true" />
              {{ copied ? m.contact.copied : m.contact.copy }}
            </button>
          </p>
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
              <a :href="CV_FILES[locale]" download>
                <Download :size="18" aria-hidden="true" /> {{ m.contact.downloadCv }}
              </a>
            </li>
            <li>
              <a :href="otherCv" download>
                <Download :size="18" aria-hidden="true" /> {{ m.contact.otherCv }}
              </a>
            </li>
          </ul>
        </div>

        <dl class="contact-facts">
          <div>
            <dt>{{ m.contact.location }}</dt>
            <dd>Guatemala (GMT-6)</dd>
          </div>
          <div>
            <dt>{{ m.contact.education }}</dt>
            <dd>{{ m.contact.educationValue }}</dd>
          </div>
        </dl>
      </section>

      <footer class="site-footer">
        <p>© {{ year }} Diego Flores</p>
        <a href="#inicio">{{ m.contact.backToTop }}</a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.home {
  --section-pad: 2rem;
  display: flex;
  flex-direction: column;
}

.section {
  padding: 4rem var(--section-pad);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  scroll-margin-top: var(--nav-h);
}

.section-title {
  font-size: var(--step-4);
  margin: 0 0 var(--s-6);
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
  color: var(--text-dim);
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

/* Captura: evidencia real del trabajo. Se corta con un desvanecido
   hacia abajo para invitar a seguir bajando. */
.hero-shot {
  margin: var(--s-8) 0 0;
}

.hero-shot figcaption {
  max-width: 62ch;
  margin-bottom: var(--s-3);
  font-size: var(--step--1);
  color: var(--text-dim);
}

.hero-shot figcaption a {
  color: var(--act);
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
.project-rows {
  margin-top: var(--s-8);
  border-top: 1px solid var(--line);
}

.project-compact {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--s-7);
}

.project-compact > * {
  border-bottom: 1px solid var(--line);
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
  color: var(--text-dim);
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
  /* Cada tarjeta mide lo que su contenido: estirarlas a la más alta dejaba
     un vacío al pie de las cortas. Las imágenes comparten proporción, así
     que los bordes superiores siguen alineados. */
  align-items: start;
}

/* Contacto */
.contact {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: var(--s-8);
  align-items: end;
  padding-block: var(--s-9) var(--s-8);
}

.contact .section-title {
  color: var(--ink);
}

.contact-lead {
  max-width: 52ch;
  margin: 0 0 var(--s-6);
  font-size: var(--step-1);
}

.contact-email {
  font-family: var(--font-display);
  font-stretch: 112%;
  font-weight: 700;
  font-size: clamp(1.25rem, 0.8rem + 2.6vw, 2.5rem);
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--act);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.18em;
  overflow-wrap: anywhere;
  transition: color 0.2s ease;
}

.contact-email:hover {
  color: var(--ink);
}

.contact-email-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-3) var(--s-5);
  margin: 0 0 var(--s-6);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: var(--r-control);
  background: none;
  color: var(--text-dim);
  font-family: var(--font-body);
  font-size: var(--step--1);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.copy-btn:hover {
  color: var(--ink);
  border-color: color-mix(in srgb, var(--ink) 35%, transparent);
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
  color: var(--ink);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--line);
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
  border-left: 1px solid var(--line);
}

.contact-facts dt {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--text-dim);
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
  border-top: 1px solid var(--line);
  font-size: var(--step--1);
  color: var(--text-dim);
}

.site-footer p {
  margin: 0;
}

.site-footer a {
  color: var(--ink);
  font-weight: 600;
}

.site-footer a:hover {
  color: var(--act);
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
    border-top: 1px solid var(--line);
  }
}

@media (max-width: 700px) {
  .project-compact {
    grid-template-columns: minmax(0, 1fr);
  }

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
