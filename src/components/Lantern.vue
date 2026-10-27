<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { TILE, wallPixel, WALLS, type Wall } from '@/lib/wall'

const props = defineProps<{ godMode: boolean }>()

const EASE = 0.12

// El mosaico se pinta una vez por color y se reutiliza como fondo repetido
const tiles = new Map<Wall, string>()
const tileFor = (wall: Wall) => {
  let url = tiles.get(wall)
  if (url) return url
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = TILE
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const img = ctx.createImageData(TILE, TILE)
  for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) {
    const [r, g, b, a] = wallPixel(x, y, wall)
    img.data.set([r, g, b, Math.round(a * 255)], (y * TILE + x) * 4)
  }
  ctx.putImageData(img, 0, 0)
  url = canvas.toDataURL()
  tiles.set(wall, url)
  return url
}

const wall = computed(() => (props.godMode ? WALLS.gold : WALLS.metal))
const lit = ref(false)
const el = ref<HTMLElement>()

const goal = { x: 0, y: 0 }
const cur = { x: 0, y: 0 }
let frame = 0

const paint = () => {
  el.value?.style.setProperty('--x', `${cur.x}px`)
  el.value?.style.setProperty('--y', `${cur.y}px`)
}

// Persigue al cursor con retraso y se detiene al alcanzarlo
const step = () => {
  cur.x += (goal.x - cur.x) * EASE
  cur.y += (goal.y - cur.y) * EASE
  paint()
  frame = Math.abs(goal.x - cur.x) < 0.5 && Math.abs(goal.y - cur.y) < 0.5 ? 0 : requestAnimationFrame(step)
}

const onMove = (e: PointerEvent) => {
  goal.x = e.clientX
  goal.y = e.clientY
  // Al entrar a la ventana la luz aparece donde está el cursor, no viaja desde la última salida
  if (!lit.value) {
    cur.x = goal.x
    cur.y = goal.y
    paint()
    lit.value = true
  }
  if (!frame) frame = requestAnimationFrame(step)
}

const onLeave = () => {
  lit.value = false
}

onMounted(() => {
  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('pointermove', onMove)
  document.documentElement.removeEventListener('pointerleave', onLeave)
})
</script>

<template>
  <div
    ref="el"
    class="lantern"
    aria-hidden="true"
    :style="{
      backgroundImage: `url(${tileFor(wall)})`,
      opacity: lit ? wall.strength : 0,
      '--r': godMode ? '300px' : '190px',
    }"
  ></div>
</template>

<style scoped>
.lantern {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-repeat: repeat;
  image-rendering: pixelated;
  transition: opacity 0.3s ease;
  -webkit-mask-image: radial-gradient(circle var(--r) at var(--x) var(--y), #000 0, #0008 45%, transparent 100%);
  mask-image: radial-gradient(circle var(--r) at var(--x) var(--y), #000 0, #0008 45%, transparent 100%);
}
</style>
