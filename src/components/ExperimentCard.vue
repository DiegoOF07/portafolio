<script setup lang="ts">
import { computed } from 'vue'
import { Link, Github } from 'lucide-vue-next'
import GlassCard from '@/components/GlassCard.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import TechBadge from './TechBadge.vue'
import type { ExperimentProject } from '@/data/projects'

const props = defineProps<{
  project: ExperimentProject
}>()

// Si todavía no hay captura, el panel muestra los logos de su stack
const techIcons = computed(() =>
  props.project.techs.map((t) => t.icon).filter((icon): icon is string => !!icon),
)
</script>

<template>
  <GlassCard variant="project" class="experiment-card">
    <MediaSlot :media="project.media" :fallback-icons="techIcons" class="experiment-media" aspect="16/10" />
    <div class="experiment-content">
      <h4>{{ project.title }}</h4>
      <p class="description">{{ project.description }}</p>
      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>
      <div v-if="project.links.demo || project.links.repo" class="buttons">
        <a v-if="project.links.demo" class="link-quiet" :href="project.links.demo" target="_blank" rel="noopener noreferrer">
          <Link :size="16" aria-hidden="true" /> Demo
        </a>
        <a v-if="project.links.repo" class="link-quiet" :href="project.links.repo" target="_blank" rel="noopener noreferrer">
          <Github :size="16" aria-hidden="true" /> Repo
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
</style>
