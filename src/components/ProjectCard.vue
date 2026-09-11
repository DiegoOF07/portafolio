<script setup lang="ts">
import { Link, Github, Lock } from 'lucide-vue-next'
import TechBadge from './TechBadge.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import type { FeaturedProject } from '@/data/projects'

defineProps<{
  project: FeaturedProject
}>()
</script>

<template>
  <!-- La pieza principal lleva captura grande; el resto son filas de texto -->
  <article :class="['project', project.lead ? 'project--lead' : 'project--row']">
    <div v-if="project.lead && project.media" class="project-media">
      <MediaSlot :media="project.media" aspect="4/3" focus="left top" />
    </div>

    <header class="project-head">
      <h3>{{ project.title }}</h3>
      <p class="project-context">{{ project.context }}</p>
    </header>

    <div class="project-body">
      <p class="project-tagline">{{ project.tagline }}</p>
      <p class="project-challenge">
        <span class="label">Reto técnico</span>
        {{ project.challenge }}
      </p>

      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>

      <p v-if="project.status" class="project-status">{{ project.status }}</p>

      <footer class="project-links">
        <RouterLink v-if="project.hasDetail" :to="`/proyectos/${project.slug}`" class="btn-primary">
          Ver el proyecto
        </RouterLink>
        <a v-if="project.links.demo" class="link-quiet" :href="project.links.demo" target="_blank" rel="noopener noreferrer">
          <Link :size="16" aria-hidden="true" /> Ver demo
        </a>
        <a v-if="project.links.repo" class="link-quiet" :href="project.links.repo" target="_blank" rel="noopener noreferrer">
          <Github :size="16" aria-hidden="true" /> Repositorio
        </a>
        <a v-if="project.links.repoFrontend" class="link-quiet" :href="project.links.repoFrontend" target="_blank" rel="noopener noreferrer">
          <Github :size="16" aria-hidden="true" /> Repo frontend
        </a>
        <a v-if="project.links.repoBackend" class="link-quiet" :href="project.links.repoBackend" target="_blank" rel="noopener noreferrer">
          <Github :size="16" aria-hidden="true" /> Repo backend
        </a>
      </footer>

      <p v-if="project.links.privacyNote" class="privacy-note">
        <Lock :size="14" aria-hidden="true" /> {{ project.links.privacyNote }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.project {
  color: var(--ink);
}

h3 {
  margin: 0;
}

.project-context {
  margin: var(--s-2) 0 0;
  font-size: var(--step--1);
  color: var(--ink-dim);
}

.project-tagline {
  margin: 0 0 var(--s-4);
  font-size: var(--step-1);
}

.project-challenge {
  max-width: 62ch;
  margin: 0 0 var(--s-5);
}

.label {
  display: block;
  margin-bottom: var(--s-1);
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--ink-dim);
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  margin-bottom: var(--s-5);
}

.project-status {
  margin: 0 0 var(--s-5);
  font-size: var(--step--1);
  color: var(--ink-dim);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-3) var(--s-6);
}

.privacy-note {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  margin: var(--s-4) 0 0;
  font-size: var(--step--1);
  color: var(--ink-dim);
}

/* Pieza principal: captura a la izquierda, contenido a la derecha */
.project--lead {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  grid-template-areas:
    'media head'
    'media body';
  grid-template-rows: auto 1fr;
  column-gap: var(--s-7);
  row-gap: var(--s-4);
}

.project--lead .project-media {
  grid-area: media;
  align-self: start;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--r-surface);
}

.project--lead .project-head {
  grid-area: head;
}

.project--lead .project-body {
  grid-area: body;
}

.project--lead h3 {
  font-size: var(--step-4);
}

/* Resto: filas ligeras, con el mismo lenguaje que la tabla del stack */
.project--row {
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
  gap: var(--s-6);
  padding-block: var(--s-7);
  border-bottom: 1px solid var(--line);
}

.project--row h3 {
  font-size: var(--step-2);
}

@media (max-width: 900px) {
  .project--lead {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'media'
      'head'
      'body';
    grid-template-rows: auto;
  }
}

@media (max-width: 700px) {
  .project--row {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--s-4);
    padding-block: var(--s-6);
  }
}
</style>
