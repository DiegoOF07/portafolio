<script setup lang="ts">
import { ImageOff } from 'lucide-vue-next'
import type { MediaAsset } from '@/data/projects'

const props = defineProps<{
  media: MediaAsset
  aspect?: string // ej. '16/9', '4/3'
}>()

const typeLabel: Record<MediaAsset['type'], string> = {
  image: 'imagen',
  gif: 'gif',
  video: 'video',
}
</script>

<template>
  <div class="media-slot" :style="{ aspectRatio: aspect || '16/9' }">
    <img v-if="media.type !== 'video' && media.src" :src="media.src" :alt="media.alt" class="media-content" />
    <video v-else-if="media.type === 'video' && media.src" :src="media.src" class="media-content" autoplay loop muted playsinline />
    <div v-else class="media-placeholder">
      <ImageOff :size="32" />
      <span>Agregar {{ typeLabel[props.media.type] }}</span>
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

.media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--ink-dim);
  border: 1px dashed rgba(255, 255, 255, 0.18);
  font-size: 0.85rem;
  font-style: italic;
}
</style>
