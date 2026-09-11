<script setup lang="ts">
import { Mail, Github, Linkedin, MapPin, GraduationCap, Download } from 'lucide-vue-next'
import GlassCard from '@/components/GlassCard.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ExperimentCard from '@/components/ExperimentCard.vue'
import TechBadge from '@/components/TechBadge.vue'
import { featuredProjects, experimentProjects } from '@/data/projects'
import { stackGroups } from '@/data/stack'
</script>

<template>
  <div class="home">
    <!--  HERO  -->
    <section id="inicio" class="section hero-section">
      <div class="hero-glass-card">
        <span class="availability-badge">
          <span class="availability-dot"></span>
          Disponible para oportunidades remotas
        </span>
        <h1>Diego Flores <span class="role">Full-Stack Developer</span></h1>
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
      <GlassCard variant="section" class="about-card">
        <h2 class="section-title">Sobre mí</h2>
        <div class="about-body">
          <img src="@/assets/img/profile.jpg" alt="Diego Flores" class="avatar" />
          <p>
            Soy estudiante de Ingeniería en Ciencias de la Computación —llevo más de
            3 años en la carrera— y desarrollador full-stack, principalmente con Go,
            Vue y bases de datos relacionales y en grafos. Disfruto llevar proyectos
            de principio a fin, desde entender el problema de un cliente real hasta
            el despliegue, y complementar eso con curiosidad técnica hacia temas
            menos comunes: he construido un compilador básico, trabajado con
            sistemas operativos a bajo nivel y experimentado con gráficos 3D y
            raytracing. Creo que entender los fundamentos, no solo los frameworks,
            es lo que hace la diferencia a largo plazo.
          </p>
        </div>
      </GlassCard>
    </section>

    <!--  PROYECTOS DESTACADOS  -->
    <section id="proyectos" class="section">
      <h2 class="section-title centered">Proyectos destacados</h2>
      <div class="projects-list">
        <ProjectCard
          v-for="(p, i) in featuredProjects"
          :key="p.slug"
          :project="p"
          :i="i"
        />
      </div>
    </section>

    <!--  STACK TÉCNICO  -->
    <section id="stack" class="section">
      <GlassCard variant="section" class="stack-card">
        <h2 class="section-title centered">Stack técnico</h2>
        <div class="stack-groups">
          <div v-for="group in stackGroups" :key="group.label" class="stack-group">
            <h3>{{ group.label }}</h3>
            <div class="stack-badges">
              <TechBadge v-for="tech in group.items" :key="tech.name" :name="tech.name" :icon="tech.icon" />
            </div>
          </div>
        </div>
      </GlassCard>
    </section>

    <!--  EXPERIMENTALES  -->
    <section id="experimentos" class="section">
      <h2 class="section-title centered">Proyectos experimentales</h2>
      <div class="experiments-grid">
        <ExperimentCard v-for="p in experimentProjects" :key="p.slug" :project="p" />
      </div>
    </section>

    <!--  CONTACTO  -->
    <section id="contacto" class="section">
      <GlassCard variant="section" class="contact-card">
        <h2 class="section-title centered">Contacto</h2>
        <p class="contact-cta">
          Escríbeme, estoy buscando oportunidades remotas.
        </p>
        <ul class="info-list">
          <li>
            <Mail class="icon" />
            <span><a href="mailto:floresdiego041@gmail.com">floresdiego041@gmail.com</a></span>
          </li>
          <li>
            <Github class="icon" />
            <span><a href="https://github.com/DiegoOF07" target="_blank">github.com/DiegoOF07</a></span>
          </li>
          <li>
            <Linkedin class="icon" />
            <span><a href="https://linkedin.com/in/diego-flores-gt" target="_blank">linkedin.com/in/diego-flores-gt</a></span>
          </li>
          <li>
            <MapPin class="icon" />
            <span>Guatemala</span>
          </li>
          <li>
            <GraduationCap class="icon" />
            <span>Ingeniería en Ciencias de la Computación</span>
          </li>
          <li>
            <Download class="icon" />
            <span><a href="/cv-diego-flores.pdf" download>Descargar CV</a></span>
          </li>
        </ul>
      </GlassCard>
    </section>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

.section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  scroll-margin-top: 4.5rem;
}

.section-title {
  font-size: var(--step-4);
  margin: 0 0 var(--s-6);
}

.section-title.centered {
  text-align: center;
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
  transition: background 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
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
  transform: translateY(-2px);
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
  transform: translateY(-2px);
}

.hero-img {
  max-width: 380px;
  width: 100%;
  flex-shrink: 0;
}

/* Sobre mí */
.about-card {
  padding: 2.5rem;
  max-width: 950px;
  margin: 0 auto;
}

.about-body {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avatar {
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--line);
}

.about-body p {
  max-width: var(--measure);
}

/* Proyectos */
.projects-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

/* Stack */
.stack-card {
  padding: 2.5rem;
  max-width: 950px;
  margin: 0 auto;
}

.stack-groups {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.stack-group h3 {
  font-family: var(--font-body);
  font-size: var(--step-0);
  font-weight: 600;
  letter-spacing: 0;
  color: var(--ink-dim);
  margin: 0 0 var(--s-3);
}

.stack-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

/* Experimentales */
.experiments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Contacto */
.contact-card {
  padding: 2.5rem;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.contact-cta {
  margin-bottom: 1.5rem;
}

.info-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.info-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
}

.icon {
  color: var(--ink-dim);
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

a {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  word-break: break-all;
}

a:hover {
  color: var(--signal);
  border-bottom: 1px solid var(--signal);
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

  .about-body {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 3rem 1rem;
  }
}
</style>
