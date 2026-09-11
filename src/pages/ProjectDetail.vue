<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Link, Github, Lock, Expand } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules'
import GlassCard from '@/components/GlassCard.vue'
import MediaSlot from '@/components/MediaSlot.vue'
import TechBadge from '@/components/TechBadge.vue'
import { getFeaturedProjectBySlug } from '@/data/projects'

const route = useRoute()
const project = computed(() => getFeaturedProjectBySlug(route.params.slug as string))

const swiperRef = ref()
const activeIndex = ref(0)

const goToSlide = (index: number) => {
  swiperRef.value?.swiper?.slideTo(index)
}

const openFullscreen = (index: number) => {
  const gallery = project.value?.detail?.gallery || []
  const media = gallery[index]
  if (!media) return
  const url = typeof media.src === 'string' ? media.src : ''
  window.open(url, '_blank')
}

const onSwiperReady = (swiper: any) => {
  swiperRef.value = swiper
}

const onSlideChange = (swiper: any) => {
  activeIndex.value = swiper.realIndex
}
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
        <p>Descripción extendida pendiente de agregar.</p>
      </div>

      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>

      <!-- Carrusel de galería estilo glassmorphism -->
      <div v-if="project.detail?.gallery?.length" class="gallery-section">
        <h3 class="gallery-title">Galería del proyecto</h3>

        <Swiper
          ref="swiperRef"
          :modules="[Navigation, Pagination, Keyboard, A11y]"
          :slides-per-view="1"
          :space-between="0"
          :loop="true"
          :navigation="true"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :keyboard="{ enabled: true }"
          :a11y="true"
          :speed="500"
          :allow-touch-move="true"
          @swiper="onSwiperReady"
          @slide-change="onSlideChange"
          class="gallery-swiper"
        >
          <SwiperSlide v-for="(m, idx) in project.detail.gallery" :key="idx">
            <div class="slide-wrapper">
              <MediaSlot :media="m" aspect="16/9" class="slide-media" />
              <button
                class="fullscreen-btn"
                @click="openFullscreen(idx)"
                :aria-label="`Ver imagen ${idx + 1} en pantalla completa`"
                :title="`Ver imagen ${idx + 1} en pantalla completa`"
              >
                <Expand :size="18" />
                <span class="fullscreen-label">Pantalla completa</span>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Miniaturas (thumbnails) -->
        <div class="thumbnails" v-if="project.detail.gallery.length > 1">
          <button
            v-for="(m, idx) in project.detail.gallery"
            :key="idx"
            :class="['thumb-btn', { active: activeIndex === idx }]"
            @click="goToSlide(idx)"
            :aria-label="`Ir a imagen ${idx + 1}`"
            :aria-current="activeIndex === idx ? 'true' : 'false'"
          >
            <MediaSlot :media="m" aspect="4/3" class="thumb-media" />
          </button>
        </div>
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
  color: var(--ink);
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.back-link:hover {
  color: var(--signal);
}

.detail-card {
  padding: 2.5rem;
  color: var(--ink);
}

.hero-media {
  border-radius: 1rem;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: var(--step-4);
  margin: 0 0 var(--s-2);
}

.tagline {
  font-size: var(--step-1);
  margin-bottom: 2rem;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.meta-grid h3 {
  font-family: var(--font-body);
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0;
  color: var(--ink-dim);
  margin: 0 0 var(--s-2);
}

.extended {
  margin-bottom: 2rem;
}

.extended h3 {
  font-size: var(--step-2);
  margin-bottom: 0.5rem;
}

.placeholder-note p {
  font-style: italic;
  color: var(--ink-dim);
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

/* ============ GALLERY CAROUSEL GLASSMORPHISM ============ */

.gallery-section {
  margin-bottom: 2rem;
}

.gallery-title {
  font-size: var(--step-2);
  margin-bottom: 1.5rem;
}

.gallery-swiper {
  --swiper-navigation-color: var(--ink);
  --swiper-pagination-color: var(--ink);
  --swiper-pagination-bullet-inactive-color: rgba(255,255,255,0.35);
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-size: 10px;
  --swiper-pagination-bullet-horizontal-gap: 8px;
  border-radius: 1rem;
  overflow: hidden;
}

.gallery-swiper :deep(.swiper-slide) {
  height: auto;
}

.gallery-swiper :deep(.swiper-button-next),
.gallery-swiper :deep(.swiper-button-prev) {
  width: 48px;
  height: 48px;
  background: var(--chrome-bg);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
  transition: background 0.2s, border-color 0.2s;
  color: var(--ink);
  --swiper-navigation-size: 20px;
}

.gallery-swiper :deep(.swiper-button-next:hover),
.gallery-swiper :deep(.swiper-button-prev:hover) {
  background: var(--chrome-bg-strong);
  border-color: var(--ink);
}

.gallery-swiper :deep(.swiper-button-next:after),
.gallery-swiper :deep(.swiper-button-prev:after) {
  font-size: 1.1rem;
  font-weight: 700;
}

.gallery-swiper :deep(.swiper-pagination) {
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--chrome-bg);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.gallery-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.5);
  opacity: 1;
  transition: background 0.2s, transform 0.2s, border-color 0.2s;
}

.gallery-swiper :deep(.swiper-pagination-bullet:hover) {
  background: rgba(255, 255, 255, 0.9);
}

.gallery-swiper :deep(.swiper-pagination-bullet-active) {
  background: var(--signal);
  border-color: var(--ink);
  transform: scale(1.25);
  box-shadow: 0 0 12px rgba(79, 209, 232, 0.6);
}

.slide-wrapper {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
}

.slide-media {
  border-radius: 1rem;
}

.fullscreen-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 16px;
  border-radius: 999px;
  background: var(--chrome-bg);
  border: 1px solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
  color: var(--ink);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, opacity 0.2s;
  opacity: 0;
}

.slide-wrapper:hover .fullscreen-btn,
.fullscreen-btn:focus-visible {
  opacity: 1;
}

.fullscreen-btn:hover {
  background: var(--chrome-bg-strong);
  border-color: var(--ink);
}

@media (hover: none) {
  .fullscreen-btn {
    opacity: 1;
  }
}

/* Thumbnails */
.thumbnails {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 0.25rem;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--signal-deep) transparent;
}

.thumbnails::-webkit-scrollbar {
  height: 6px;
}

.thumbnails::-webkit-scrollbar-track {
  background: transparent;
}

.thumbnails::-webkit-scrollbar-thumb {
  background: var(--signal-deep);
  border-radius: 3px;
}

.thumb-btn {
  flex: 0 0 auto;
  width: 120px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  background: transparent;
  cursor: pointer;
  transition: border-color 0.2s;
  overflow: hidden;
}

.thumb-btn:hover {
  border-color: rgba(255, 255, 255, 0.25);
}

.thumb-btn.active {
  border-color: var(--signal);
  box-shadow: 0 0 16px rgba(79, 209, 232, 0.35);
}

.thumb-media {
  border-radius: 0.5rem;
  display: block;
}

/* Focus visible for accessibility */
.gallery-swiper :deep(.swiper-button-next:focus-visible),
.gallery-swiper :deep(.swiper-button-prev:focus-visible),
.gallery-swiper :deep(.swiper-pagination-bullet:focus-visible),
.thumb-btn:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
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

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--ink);
}
</style>