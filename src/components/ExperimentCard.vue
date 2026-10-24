<script setup lang="ts">
import { computed } from 'vue'
import { Link, Github, Play } from 'lucide-vue-next'
import GlassCard from '@/components/GlassCard.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import TechBadge from './TechBadge.vue'
import type { ExperimentProject } from '@/data/projects'
import { useLocale } from '@/i18n'

const props = defineProps<{
  project: ExperimentProject
}>()

const { t } = useLocale()

// Si todavía no hay captura, el panel muestra los logos de su stack
const techIcons = computed(() =>
  props.project.techs.map((t) => t.icon).filter((icon): icon is string => !!icon),
)
</script>

<template>
  <GlassCard variant="project" class="experiment-card">
    <MediaSlot :media="project.media" :fallback-icons="techIcons" class="experiment-media" aspect="16/10" />
    <div class="experiment-content">
      <h4>{{ t(project.title) }}</h4>
      <p class="description">{{ t(project.description) }}</p>
      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>
      <!-- Serie de varios repos: una fila por pieza, para no apilar seis
           links sueltos en una tarjeta que debe seguir siendo compacta -->
      <ul v-if="project.parts" class="parts">
        <li v-for="part in project.parts" :key="part.repo">
          <span class="part-name">{{ t(part.name) }}</span>
          <a class="link-quiet" :href="part.repo" target="_blank" rel="noopener noreferrer">
            <Github :size="14" aria-hidden="true" /> Repo
          </a>
          <a v-if="part.video" class="link-quiet" :href="part.video" target="_blank" rel="noopener noreferrer">
            <Play :size="14" aria-hidden="true" /> Video
          </a>
        </li>
      </ul>

      <div v-else-if="project.links.demo || project.links.repos?.length" class="buttons">
        <a v-if="project.links.demo" class="link-quiet" :href="project.links.demo" target="_blank" rel="noopener noreferrer">
          <Link :size="16" aria-hidden="true" /> Demo
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
      </div>
    </div>
  </GlassCard>
</template>

<style scoped>
.experiment-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: var(--ink);
}

.experiment-media {
  width: 100%;
}

.experiment-content {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

h4 {
  font-size: var(--step-2);
  margin: 0;
}

.description {
  font-size: 0.85rem;
  color: var(--ink-dim);
  margin: 0;
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.buttons {
  display: flex;
  gap: var(--s-5);
  margin-top: var(--s-2);
  font-size: var(--step--1);
}

/* Lista de piezas de una serie. Cada fila se parte sola si la tarjeta
   llega a su ancho mínimo (280px en la rejilla de experimentales). */
.parts {
  list-style: none;
  margin: var(--s-2) 0 0;
  padding: 0;
  font-size: var(--step--1);
}

.parts li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--s-1) var(--s-4);
  padding-block: var(--s-2);
  border-top: 1px solid var(--line);
}

.part-name {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--ink);
}
</style>
