<script setup lang="ts">
import { Link, Github } from 'lucide-vue-next'
import GlassCard from '@/components/GlassCard.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import TechBadge from './TechBadge.vue'
import type { ExperimentProject } from '@/data/projects'

defineProps<{
  project: ExperimentProject
}>()
</script>

<template>
  <GlassCard variant="project" class="experiment-card">
    <MediaSlot :media="project.media" class="experiment-media" aspect="16/10" />
    <div class="experiment-content">
      <h4>{{ project.title }}</h4>
      <p class="description">{{ project.description }}</p>
      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>
      <div class="buttons">
        <a v-if="project.links.demo" class="exp-btn" :href="project.links.demo" target="_blank">
          <Link :size="16" /> Demo
        </a>
        <a v-if="project.links.repo" class="exp-btn" :href="project.links.repo" target="_blank">
          <Github :size="16" /> Repo
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
  gap: 0.6rem;
  margin-top: 0.4rem;
}

.exp-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--r-control);
  background: var(--btn-glass-bg);
  border: var(--btn-glass-border);
  color: var(--ink);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 0.2s ease;
}

.exp-btn:hover {
  background: var(--btn-glass-hover-bg);
}
</style>
