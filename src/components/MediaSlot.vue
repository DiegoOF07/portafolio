<script setup lang="ts">
import type { MediaAsset } from '@/data/projects'

withDefaults(
  defineProps<{
    media: MediaAsset
    aspect?: string // ej. '16/9', '4/3'
    // Punto de anclaje al recortar (object-position). Las capturas de
    // interfaz se leen mejor ancladas arriba a la izquierda.
    focus?: string
    // true solo para imágenes de la primera pantalla: se cargan de
    // inmediato y con prioridad alta. El resto se carga al acercarse.
    priority?: boolean
    // Logos que se muestran mientras no haya captura
    fallbackIcons?: string[]
  }>(),
  { aspect: '16/9', focus: 'center', priority: false, fallbackIcons: () => [] },
)
</script>

<template>
  <div class="media-slot" :style="{ aspectRatio: aspect }">
    <img
      v-if="media.type !== 'video' && media.src"
      :src="media.src"
      :alt="media.alt"
      :style="{ objectPosition: focus }"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      class="media-content"
    />
    <video
      v-else-if="media.type === 'video' && media.src"
      :src="media.src"
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
  background: rgba(255, 255, 255, 0.03);
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
  background-color: var(--field-raised);
  background-image: radial-gradient(circle, rgba(232, 237, 247, 0.1) 1px, transparent 1.5px);
  background-size: 18px 18px;
}

.media-fallback img {
  width: 44px;
  height: 44px;
  object-fit: contain;
}
</style>
