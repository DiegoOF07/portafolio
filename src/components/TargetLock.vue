<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@/composables/useMediaQuery'

const emit = defineEmits<{ lock: [slug: string | null] }>()

const finePointer = useMediaQuery('(pointer: fine)')
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const root = ref<HTMLElement>()
const box = reactive({ left: 0, top: 0, width: 0, height: 0 })
const visible = ref(false)
// Al aparecer se coloca sin deslizarse desde la última tarjeta; solo se desliza entre tarjetas
const sliding = ref(false)
let target: HTMLElement | null = null

const place = () => {
  if (!target || !root.value) return
  const r = root.value.getBoundingClientRect()
  const k = target.getBoundingClientRect()
  Object.assign(box, { left: k.left - r.left, top: k.top - r.top, width: k.width, height: k.height })
}

const aim = (next: HTMLElement | null) => {
  if (next === target) return
  const wasVisible = visible.value
  target = next
  if (next) {
    sliding.value = wasVisible
    place()
    visible.value = true
  } else {
    visible.value = false
  }
  emit('lock', next?.dataset.target ?? null)
}

// Ratón: el objetivo es la tarjeta bajo el cursor; en los huecos entre tarjetas la mira se queda donde estaba
const onPointerMove = (e: PointerEvent) => {
  if (!finePointer.value) return
  const card = (e.target as HTMLElement).closest<HTMLElement>('[data-target]')
  if (card) aim(card)
}

const onPointerLeave = () => {
  if (finePointer.value) aim(null)
}

// Táctil: la tarjeta más cerca del centro de la pantalla, si su centro queda a menos del 30 % de su alto
let frame = 0
const centerCard = () => {
  frame = 0
  if (finePointer.value || !root.value) return
  const mid = window.innerHeight / 2
  let best: HTMLElement | null = null
  let bestDist = Infinity
  for (const card of root.value.querySelectorAll<HTMLElement>('[data-target]')) {
    const k = card.getBoundingClientRect()
    const dist = Math.abs(k.top + k.height / 2 - mid)
    if (dist < k.height * 0.3 && dist < bestDist) {
      best = card
      bestDist = dist
    }
  }
  aim(best)
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(centerCard)
}

// Si el layout cambia (fuentes, imágenes, ancho), la mira se vuelve a medir sin animarse
let resizeObserver: ResizeObserver | undefined
const remeasure = () => {
  sliding.value = false
  place()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  resizeObserver = new ResizeObserver(remeasure)
  if (root.value) resizeObserver.observe(root.value)
  onScroll()
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div ref="root" class="target-lock" @pointermove="onPointerMove" @pointerleave="onPointerLeave">
    <slot />
    <div
      :class="['bracket', { on: visible, sliding: sliding && !reducedMotion }]"
      :style="{ left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px` }"
      aria-hidden="true"
    >
      <i v-for="n in 4" :key="n"></i>
    </div>
  </div>
</template>

<style scoped>
.target-lock {
  position: relative;
}

.bracket {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.bracket.on {
  opacity: 1;
}

.bracket.sliding {
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  transition: left 0.35s var(--ease), top 0.35s var(--ease), width 0.35s var(--ease), height 0.35s var(--ease), opacity 0.25s ease;
}

@media (prefers-reduced-motion: reduce) {
  .bracket {
    transition: none;
  }
}

.bracket i {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid var(--act);
}

.bracket i:nth-child(1) { left: -6px; top: -6px; border-right: 0; border-bottom: 0; }
.bracket i:nth-child(2) { right: -6px; top: -6px; border-left: 0; border-bottom: 0; }
.bracket i:nth-child(3) { left: -6px; bottom: -6px; border-right: 0; border-top: 0; }
.bracket i:nth-child(4) { right: -6px; bottom: -6px; border-left: 0; border-top: 0; }
</style>
