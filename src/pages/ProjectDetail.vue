<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Link, Github, Lock, Expand } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules'
import MediaSlot from '@/components/MediaSlot.vue'
import TechBadge from '@/components/TechBadge.vue'
import MetricCounter from '@/components/MetricCounter.vue'
import { getFeaturedProjectBySlug, levelOf } from '@/data/projects'
import { useLocale, homeRoute } from '@/i18n'
import { useVisitProgress } from '@/composables/useVisitProgress'

const route = useRoute()
const { locale, m, t, src } = useLocale()
const project = computed(() => getFeaturedProjectBySlug(route.params.slug as string))

const { markProject } = useVisitProgress()
watch(project, (p) => p && markProject(p.slug), { immediate: true })

const swiperRef = ref()
const activeIndex = ref(0)

const goToSlide = (index: number) => {
  swiperRef.value?.swiper?.slideTo(index)
}

const openFullscreen = (index: number) => {
  const gallery = project.value?.detail?.gallery || []
  const media = gallery[index]
  if (!media) return
  window.open(src(media.src), '_blank')
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
    <article class="detail-card">
      <figure v-if="project.media?.type === 'diagram'" class="diagram hero-media">
        <div class="diagram-scroll" role="region" tabindex="0" :aria-label="m.project.diagramRegion">
          <img :src="src(project.media.src)" :alt="t(project.media.alt)" width="1200" height="675" fetchpriority="high" />
        </div>
        <figcaption>
          <span class="diagram-hint">{{ m.project.diagramHint }}</span>
          <a :href="src(project.media.src)" target="_blank" rel="noopener noreferrer">{{ m.project.diagramOpen }}</a>
        </figcaption>
      </figure>
      <MediaSlot v-else-if="project.media" :media="project.media" aspect="16/9" focus="left top" priority class="hero-media" />

      <p class="detail-level">{{ levelOf(project.slug) }} · {{ t(project.kind) }}</p>
      <h1>{{ t(project.title) }}</h1>
      <p class="tagline">{{ t(project.tagline) }}</p>

      <div class="meta-grid">
        <div>
          <h3>{{ m.project.context }}</h3>
          <p>{{ t(project.context) }}</p>
        </div>
        <div>
          <h3>{{ m.project.challenge }}</h3>
          <p>{{ t(project.challenge) }}</p>
        </div>
        <div v-if="project.status">
          <h3>{{ m.project.status }}</h3>
          <p>{{ t(project.status) }}</p>
        </div>
      </div>

      <dl v-if="project.detail?.stats" class="stats" :aria-label="m.project.stats">
        <div v-for="stat in project.detail.stats" :key="stat.label.es">
          <dt>{{ t(stat.label) }}</dt>
          <dd><MetricCounter :value="src(stat.value)" play /></dd>
        </div>
      </dl>

      <section v-for="section in project.detail?.sections" :key="section.heading.es" class="detail-section">
        <h2>{{ t(section.heading) }}</h2>
        <p v-for="(paragraph, idx) in t(section.body).split('\n\n')" :key="idx">
          {{ paragraph }}
        </p>
      </section>

      <div class="techs">
        <TechBadge v-for="(tech, idx) in project.techs" :key="idx" :name="tech.name" :icon="tech.icon" />
      </div>

      <div v-if="project.detail?.gallery?.length" class="gallery-section">
        <h2 class="gallery-title">{{ m.project.gallery }}</h2>

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
          <SwiperSlide v-for="(shot, idx) in project.detail.gallery" :key="idx">
            <div class="slide-wrapper">
              <MediaSlot :media="shot" aspect="16/9" class="slide-media" />
              <button
                class="fullscreen-btn"
                @click="openFullscreen(idx)"
                :aria-label="m.project.fullscreenAria(idx + 1)"
                :title="m.project.fullscreenAria(idx + 1)"
              >
                <Expand :size="18" />
                <span class="fullscreen-label">{{ m.project.fullscreen }}</span>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Miniaturas (thumbnails) -->
        <div class="thumbnails" v-if="project.detail.gallery.length > 1">
          <button
            v-for="(shot, idx) in project.detail.gallery"
            :key="idx"
            :class="['thumb-btn', { active: activeIndex === idx }]"
            @click="goToSlide(idx)"
            :aria-label="m.project.goToImage(idx + 1)"
            :aria-current="activeIndex === idx ? 'true' : 'false'"
          >
            <MediaSlot :media="shot" aspect="4/3" class="thumb-media" />
          </button>
        </div>
      </div>

      <footer class="buttons">
        <a v-if="project.links.demo" class="project-btn" :href="project.links.demo" target="_blank" rel="noopener noreferrer">
          <Link :size="18" /> {{ m.project.seeDemo }}
        </a>
        <a
          v-for="repo in project.links.repos"
          :key="repo.url"
          class="project-btn"
          :href="repo.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github :size="18" /> {{ t(repo.label) }}
        </a>
        <span v-if="project.links.privacyNote" class="privacy-note">
          <Lock :size="16" /> {{ t(project.links.privacyNote) }}
        </span>
      </footer>
    </article>
  </section>

  <section class="not-found" v-else>
    <p>{{ m.project.notFound }}</p>
    <RouterLink :to="homeRoute(locale, 'proyectos')" class="back-link"><ArrowLeft :size="18" /> {{ m.project.back }}</RouterLink>
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
  font-weight: 600;
}

.back-link:hover {
  color: var(--act);
}

.detail-card {
  padding: 2.5rem;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-surface);
}

.hero-media {
  border-radius: var(--r-surface);
  margin-bottom: 1.5rem;
}

.diagram {
  margin-inline: 0;
}

.diagram-scroll {
  overflow-x: auto;
  border-radius: var(--r-surface);
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}

.diagram-scroll img {
  display: block;
  width: 100%;
  height: auto;
}

.diagram figcaption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--s-2) var(--s-4);
  margin-top: var(--s-2);
  font-size: var(--step--1);
  color: var(--text-dim);
}

.diagram figcaption a {
  font-weight: 600;
}

.diagram-hint {
  display: none;
}

/* Por debajo de ~760 px el texto del diagrama baja de 10 px: se recorre en vez de encogerse */
@media (max-width: 760px) {
  .diagram-scroll img {
    width: 760px;
    max-width: none;
  }

  .diagram-hint {
    display: inline;
  }
}

@media (max-width: 600px) {
  .detail-wrapper {
    padding: 1rem;
  }

  .detail-card {
    padding: 1.25rem;
  }
}

.detail-level {
  margin: 0 0 var(--s-2);
  font-family: var(--font-pixel);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--label);
}

h1 {
  font-size: var(--step-4);
  margin: 0 0 var(--s-2);
}

.tagline {
  font-size: var(--step-1);
  margin-bottom: 2rem;
}

/* El reto técnico es el campo más largo: con columnas iguales quedaba en una tira angosta */
.meta-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr) minmax(0, 1fr);
  gap: 1.5rem 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 900px) {
  .meta-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

.meta-grid h3 {
  font-family: var(--font-body);
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0;
  color: var(--text-dim);
  margin: 0 0 var(--s-2);
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section h2 {
  font-size: var(--step-2);
  margin-bottom: 0.5rem;
}

.detail-section p {
  max-width: 68ch;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: var(--s-4);
  margin: 0 0 2.5rem;
  padding-block: var(--s-5);
  border-block: 1px solid var(--line);
}

.stats div {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
}

/* Con order y no column-reverse: los valores quedan alineados arriba aunque una etiqueta ocupe dos líneas */
.stats dd {
  order: -1;
}

.stats dt {
  font-size: var(--step--1);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-faint);
}

.stats dd {
  margin: 0;
  font-size: var(--step-2);
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

/* Galería */

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
  --swiper-pagination-bullet-inactive-color: var(--text-faint);
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-size: 10px;
  --swiper-pagination-bullet-horizontal-gap: 8px;
  border-radius: var(--r-surface);
  overflow: hidden;
}

.gallery-swiper :deep(.swiper-slide) {
  height: auto;
}

.gallery-swiper :deep(.swiper-button-next),
.gallery-swiper :deep(.swiper-button-prev) {
  /* Swiper 12: fija el tamaño del botón y su centrado vertical */
  --swiper-navigation-size: 48px;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  border: 1px solid var(--line);
  border-radius: var(--r-control);
  transition: background 0.2s, border-color 0.2s;
  color: var(--ink);
}

.gallery-swiper :deep(.swiper-button-next:hover),
.gallery-swiper :deep(.swiper-button-prev:hover) {
  background: var(--surface);
  border-color: var(--ink);
}

/* El SVG llena el botón por defecto */
.gallery-swiper :deep(.swiper-navigation-icon) {
  width: 10px;
  height: 18px;
}

.gallery-swiper :deep(.swiper-pagination) {
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  padding: 6px 12px;
  border-radius: var(--r-control);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  border: 1px solid var(--line);
}

.gallery-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  border-radius: var(--r-control);
  background: var(--text-faint);
  border: 1px solid var(--text-faint);
  opacity: 1;
  transition: background 0.2s, transform 0.2s, border-color 0.2s;
}

.gallery-swiper :deep(.swiper-pagination-bullet:hover) {
  background: var(--text);
}

.gallery-swiper :deep(.swiper-pagination-bullet-active) {
  background: var(--act);
  border-color: var(--ink);
  transform: scale(1.25);
}

.slide-wrapper {
  position: relative;
  border-radius: var(--r-surface);
  overflow: hidden;
}

.slide-media {
  border-radius: var(--r-surface);
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
  border-radius: var(--r-control);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  border: 1px solid var(--line);
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
  background: var(--surface);
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
  scrollbar-color: var(--line) transparent;
}

.thumbnails::-webkit-scrollbar {
  height: 6px;
}

.thumbnails::-webkit-scrollbar-track {
  background: transparent;
}

.thumbnails::-webkit-scrollbar-thumb {
  background: var(--line);
  border-radius: 3px;
}

.thumb-btn {
  flex: 0 0 auto;
  width: 120px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: var(--r-surface);
  background: transparent;
  cursor: pointer;
  transition: border-color 0.2s;
  overflow: hidden;
}

.thumb-btn:hover {
  border-color: var(--text-faint);
}

.thumb-btn.active {
  border-color: var(--act);
}

.thumb-media {
  border-radius: var(--r-control);
  display: block;
}

/* Focus visible for accessibility */
.gallery-swiper :deep(.swiper-button-next:focus-visible),
.gallery-swiper :deep(.swiper-button-prev:focus-visible),
.gallery-swiper :deep(.swiper-pagination-bullet:focus-visible),
.thumb-btn:focus-visible {
  outline: 2px solid var(--label);
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
  color: var(--text-dim);
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--r-control);
  border: 1px solid var(--line);
  color: var(--ink);
  text-decoration: none;
  font-family: var(--font-mono);
  font-weight: 600;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.project-btn:hover {
  color: var(--ink);
  background: var(--surface);
  border-color: var(--text-faint);
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--ink);
}
</style>