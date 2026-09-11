<script setup lang="ts">
import { Link, Github, ArrowRight, Lock } from 'lucide-vue-next'
import TechBadge from './TechBadge.vue'
import GlassCard from '@/components/GlassCard.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import type { FeaturedProject } from '@/data/projects'

defineProps<{
  project: FeaturedProject
}>()
</script>

<template>
  <GlassCard variant="project" class="project-card">
    <MediaSlot :media="project.media" class="project-image" />
    <div class="project-content">
      <header>
        <h3>{{ project.title }}</h3>
        <p class="tagline">{{ project.tagline }}</p>
        <p class="meta"><strong>Contexto:</strong> {{ project.context }}</p>
        <p class="meta"><strong>Reto técnico:</strong> {{ project.challenge }}</p>
      </header>

      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>

      <p class="status">{{ project.status }}</p>

      <footer class="buttons">
        <a v-if="project.links.demo" class="project-btn" :href="project.links.demo" target="_blank">
          <Link :size="18" /> Ver demo
        </a>
        <a v-if="project.links.repo" class="project-btn" :href="project.links.repo" target="_blank">
          <Github :size="18" /> Repositorio
        </a>
        <a v-if="project.links.repoFrontend" class="project-btn" :href="project.links.repoFrontend" target="_blank">
          <Github :size="18" /> Repo frontend
        </a>
        <a v-if="project.links.repoBackend" class="project-btn" :href="project.links.repoBackend" target="_blank">
          <Github :size="18" /> Repo backend
        </a>
        <span v-if="project.links.privacyNote" class="privacy-note">
          <Lock :size="16" /> {{ project.links.privacyNote }}
        </span>
        <RouterLink v-if="project.hasDetail" :to="`/proyectos/${project.slug}`" class="project-btn project-btn-primary">
          Ver más <ArrowRight :size="18" />
        </RouterLink>
      </footer>
    </div>
  </GlassCard>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  color: var(--ink);
  max-width: 950px;
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.project-image {
  width: 100%;
  height: 240px;
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

h3 {
  font-size: var(--step-3);
  margin: 0.2rem 0;
}

.tagline {
  font-size: 1rem;
  margin-top: 0.5rem;
}

.meta {
  color: var(--ink-dim);
  font-size: 0.9rem;
  margin-top: 0.35rem;
}

.status {
  font-size: 0.85rem;
  font-style: italic;
  color: var(--ink-dim);
  margin-top: 0.5rem;
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.5rem;
}

.privacy-note {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--ink-dim);
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--r-control);
  backdrop-filter: blur(10px);
  background: var(--btn-glass-bg);
  border: var(--btn-glass-border);
  color: var(--ink);
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.project-btn:hover {
  background: var(--btn-glass-hover-bg);
  box-shadow: var(--btn-glass-shadow);
}

.project-btn-primary {
  background: var(--signal);
  border-color: var(--signal);
  color: var(--signal-ink);
}

.project-btn-primary:hover {
  background: color-mix(in srgb, var(--signal) 80%, white);
}

@media (min-width: 768px) {
  .project-card {
    flex-direction: row;
    max-height: none;
  }

  .project-image {
    width: 40%;
    height: auto;
  }

  .project-content {
    width: 60%;
    gap: 0.5rem;
  }

  .techs, .buttons {
    margin-top: 1rem;
  }

  h3 {
    margin: 1rem 0 0.25rem;
  }
}
</style>
