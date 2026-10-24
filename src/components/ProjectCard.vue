<script setup lang="ts">
import { computed } from 'vue'
import { Link, Github, Lock } from 'lucide-vue-next'
import TechBadge from './TechBadge.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import type { FeaturedProject } from '@/data/projects'
import { useLocale, projectRoute } from '@/i18n'

const props = defineProps<{
  project: FeaturedProject
}>()

const { locale, m, t } = useLocale()

const variant = computed(() => (props.project.lead ? 'lead' : props.project.compact ? 'compact' : 'row'))
</script>

<template>
  <!-- La pieza principal lleva captura grande; el resto son filas de texto -->
  <article :class="['project', `project--${variant}`]">
    <div v-if="project.lead && project.media" class="project-media">
      <MediaSlot :media="project.media" aspect="4/3" focus="left top" />
    </div>

    <header class="project-head">
      <h3>{{ t(project.title) }}</h3>
      <p class="project-context">{{ t(project.context) }}</p>
    </header>

    <div class="project-body">
      <p class="project-tagline">{{ t(project.tagline) }}</p>
      <p v-if="variant !== 'compact'" class="project-challenge">
        <span class="label">{{ m.project.challenge }}</span>
        {{ t(project.challenge) }}
      </p>

      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>

      <p v-if="project.status && variant !== 'compact'" class="project-status">{{ t(project.status) }}</p>

      <footer class="project-links">
        <RouterLink v-if="project.hasDetail" :to="projectRoute(locale, project.slug)" class="btn-primary">
          {{ m.project.seeProject }}
        </RouterLink>
        <a v-if="project.links.demo" class="link-quiet" :href="project.links.demo" target="_blank" rel="noopener noreferrer">
          <Link :size="16" aria-hidden="true" /> {{ m.project.seeDemo }}
        </a>
        <a
          v-for="repo in project.links.repos"
          :key="repo.url"
          class="link-quiet"
          :href="repo.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github :size="16" aria-hidden="true" /> {{ t(repo.label) }}
        </a>
      </footer>

      <p v-if="project.links.privacyNote" class="privacy-note">
        <Lock :size="14" aria-hidden="true" /> {{ t(project.links.privacyNote) }}
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

/* Proyectos secundarios: sin reto técnico ni estado */
.project--compact {
  padding-block: var(--s-6);
}

.project--compact h3 {
  font-size: var(--step-1);
}

.project--compact .project-tagline {
  margin-top: var(--s-3);
  font-size: var(--step-0);
}

.project--compact .techs {
  margin-bottom: var(--s-4);
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
