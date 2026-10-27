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

// El número en VT323; prefijo y sufijo en mono porque VT323 dibuja raro "~" y "<"
const number = computed(() => {
  if (!parts.value) return ''
  const text = metricAt(parts.value, progress.value)
  return text.slice(parts.value.prefix.length, text.length - parts.value.suffix.length)
})
</script>

<template>
  <span class="metric" :aria-label="value" role="img">
    <span aria-hidden="true">
      <template v-if="parts">
        <span class="affix">{{ parts.prefix }}</span><span class="number">{{ number }}</span><span class="affix">{{ parts.suffix }}</span>
      </template>
      <span v-else class="number">{{ value }}</span>
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
