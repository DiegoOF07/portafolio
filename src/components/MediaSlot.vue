<script setup lang="ts">
import type { MediaAsset } from '@/data/projects'
import { useLocale } from '@/i18n'

withDefaults(
  defineProps<{
    media: MediaAsset
    aspect?: string // ej. '16/9', '4/3'
    // Anclaje al recortar: las capturas de interfaz se leen mejor desde arriba a la izquierda
    focus?: string
    // Solo para la primera pantalla: carga inmediata y con prioridad alta
    priority?: boolean
    // Logos que se muestran mientras no haya captura
    fallbackIcons?: string[]
  }>(),
  { aspect: '16/9', focus: 'center', priority: false, fallbackIcons: () => [] },
)

const { t, src } = useLocale()
</script>

<template>
  <div class="media-slot" :style="{ aspectRatio: aspect }">
    <img
      v-if="media.type !== 'video' && media.src"
      :src="src(media.src)"
      :alt="t(media.alt)"
      :style="{ objectPosition: focus }"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      class="media-content"
    />
    <video
      v-else-if="media.type === 'video' && media.src"
      :src="src(media.src)"
      :aria-label="t(media.alt)"
      :style="{ objectPosition: focus }"
      class="media-content"
      autoplay
      loop
      muted
      playsinline
    />
    <!-- Sin captura: panel de rejilla con los logos del stack, nunca un hueco -->
    <div v-else class="media-fallback" aria-hidden="true">
      <img v-for="icon in fallbackIcons" :key="icon" :src="icon" alt="" />
    </div>
  </div>
</template>

<style scoped>
.media-slot {
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: var(--surface);
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.media-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-5);
  background-color: var(--surface);
  background-image: radial-gradient(circle, color-mix(in srgb, var(--ink) 10%, transparent) 1px, transparent 1.5px);
  background-size: 18px 18px;
}

.media-fallback img {
  width: 44px;
  height: 44px;
  object-fit: contain;
}
</style>
