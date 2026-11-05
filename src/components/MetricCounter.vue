<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { splitMetric, metricAt } from '@/lib/metric'
import { useMediaQuery } from '@/composables/useMediaQuery'

const props = defineProps<{ value: string; play: boolean }>()

const DURATION = 700
const parts = computed(() => splitMetric(props.value))
const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

// Arranca en el valor final: sin JS, sin número o con movimiento reducido se queda así
const progress = ref(1)
let frame = 0

const run = () => {
  cancelAnimationFrame(frame)
  if (!parts.value || reduced.value) return
  const start = performance.now()
  const tick = (now: number) => {
    progress.value = Math.min((now - start) / DURATION, 1)
    if (progress.value < 1) frame = requestAnimationFrame(tick)
  }
  progress.value = 0
  frame = requestAnimationFrame(tick)
}

watch(() => props.play, (play) => play && run(), { immediate: true })
onUnmounted(() => cancelAnimationFrame(frame))

const text = computed(() => (parts.value ? metricAt(parts.value, progress.value) : props.value))

// Todo en VT323 salvo "~", "<" y ">", que VT323 dibuja raro: esos van en mono
const runs = computed(() => text.value.split(/([~<>]+)/).filter(Boolean).map((t) => ({ t, mono: /^[~<>]+$/.test(t) })))
</script>

<template>
  <span class="metric" :aria-label="value" role="img">
    <span aria-hidden="true">
      <span v-for="(run, i) in runs" :key="i" :class="run.mono ? 'affix' : 'number'">{{ run.t }}</span>
    </span>
  </span>
</template>

<style scoped>
.metric {
  color: var(--act);
  white-space: nowrap;
}

.number {
  font-family: var(--font-hud);
  font-size: 1.6em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.affix {
  font-family: var(--font-mono);
  font-weight: 600;
}
</style>
