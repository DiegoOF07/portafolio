<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Link, Github, Lock } from 'lucide-vue-next'
import GlassCard from '@/components/GlassCard.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import TechBadge from '@/components/TechBadge.vue'
import { getFeaturedProjectBySlug } from '@/data/projects'

const route = useRoute()
const project = computed(() => getFeaturedProjectBySlug(route.params.slug as string))
</script>

<template>
  <section class="detail-wrapper" v-if="project">
    <RouterLink to="/#proyectos" class="back-link"><ArrowLeft :size="18" /> Volver a proyectos</RouterLink>

    <GlassCard variant="section" class="detail-card">
      <MediaSlot :media="project.media" aspect="16/9" class="hero-media" />

      <h1>{{ project.title }}</h1>
      <p class="tagline">{{ project.tagline }}</p>

      <div class="meta-grid">
        <div>
          <h3>Contexto</h3>
          <p>{{ project.context }}</p>
        </div>
        <div>
          <h3>Reto técnico</h3>
          <p>{{ project.challenge }}</p>
        </div>
        <div>
          <h3>Estado</h3>
          <p>{{ project.status }}</p>
        </div>
      </div>

      <div v-if="project.detail?.extendedDescription" class="extended">
        <h3>Más sobre el proyecto</h3>
        <p>{{ project.detail.extendedDescription }}</p>
      </div>
      <div v-else class="extended placeholder-note">
        <!-- TODO: agregar descripción extendida en src/data/projects.ts -->
        <p>Descripción extendida pendiente de agregar.</p>
      </div>

      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>

      <div v-if="project.detail?.gallery?.length" class="gallery">
        <MediaSlot v-for="(m, idx) in project.detail.gallery" :key="idx" :media="m" aspect="4/3" />
      </div>

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
      </footer>
    </GlassCard>
  </section>

  <section class="not-found" v-else>
    <p>Proyecto no encontrado.</p>
    <RouterLink to="/#proyectos" class="back-link"><ArrowLeft :size="18" /> Volver a proyectos</RouterLink>
  </section>
</template>

<style scoped>
.detail-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-primary);
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.back-link:hover {
  color: var(--color-accent);
}

.detail-card {
  padding: 2.5rem;
  color: var(--color-text-primary);
}

.hero-media {
  border-radius: 1rem;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2.25rem;
  color: var(--color-accent);
  margin: 0 0 0.5rem;
}

.tagline {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.meta-grid h3 {
  color: var(--color-accent);
  font-size: 1rem;
  margin-bottom: 0.4rem;
}

.extended {
  margin-bottom: 2rem;
}

.extended h3 {
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.placeholder-note p {
  font-style: italic;
  color: var(--color-text-secondary, rgba(255,255,255,0.6));
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.privacy-note {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-text-secondary, rgba(255,255,255,0.7));
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

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-primary);
}
</style>
