<script setup lang="ts">
import { motion } from 'motion-v'
import { Link, Github } from 'lucide-vue-next'
import TechBadge from './TechBadge.vue'
import GlassCard from '@/components/GlassCard.vue'

defineProps<{
  title: string
  description: string
  image: string
  techs: { name: string; icon?: string }[]
  link?: string
  github?: string
  i: number
}>()

const variants = (i: number) => ({
  offscreen: { opacity: 0, y: 20 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.4, duration: 0.4, delay: i * 0.05 }
  }
})
</script>

<template>
  <motion.div
    :initial="'offscreen'"
    :while-in-view="'onscreen'"
    :in-view-options="{ amount: 0.15, once: true }"
    :variants="variants(i)"
  >
    <GlassCard variant="project" hoverable class="project-card">
      <img :src="image" :alt="title" class="project-image" />
      <div class="project-content">
        <header>
          <h3>{{ title }}</h3>
          <p class="description">{{ description }}</p>
        </header>

        <div class="techs">
          <TechBadge v-for="(tech, idx) in techs" :key="idx" :name="tech.name" :icon="tech.icon" />
        </div>

        <footer class="buttons">
          <a v-if="link" class="project-btn" :href="link" target="_blank"><Link :size="18" /> Ver proyecto</a>
          <a v-if="github" class="project-btn" :href="github" target="_blank"><Github :size="18" /> GitHub</a>
        </footer>
      </div>
    </GlassCard>
  </motion.div>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  color: var(--color-text-primary);
  max-width: 950px;
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.project-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

h3 {
  font-size: 2rem;
  color: var(--color-accent);
  margin: 0.2rem 0;
}

.description {
  color: var(--color-text-primary);
  font-size: 1rem;
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
  margin-top: 0.5rem;
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  background: var(--btn-glass-bg);
  border: var(--btn-glass-border);
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.project-btn:hover {
  background: var(--btn-glass-hover-bg);
  transform: translateY(-2px);
  box-shadow: var(--btn-glass-shadow);
}

@media (min-width: 768px) {
  .project-card {
    flex-direction: row;
    max-height: 405px;
  }

  .project-image {
    width: 40%;
    height: auto;
  }

  .project-content {
    width: 60%;
    gap: 1rem;
  }

  .techs, .buttons {
    margin-top: 1rem;
  }

  h3 {
    margin: 1rem 0;
  }
}
</style>