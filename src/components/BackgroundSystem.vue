<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useBackground } from '@/composables/useBackground'

interface Props {
  type: 'home' | 'projects'
}

const props = defineProps<Props>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const background = useBackground()

let animationFrame: number
let time = 0

interface SphereConfig {
  xRatio:     number
  yRatio:     number
  radius:     number
  solidColor: string
  glowColor:  string
  speed:      number
  amplitude:  number
  depth:      number
}

const sphereConfigs: Record<string, SphereConfig[]> = {
  home: [
    { xRatio: 0.12, yRatio: 0.18, radius: 260, solidColor: '#087E8B', glowColor: '#06C5D9', speed: 0.0000016, amplitude: 28, depth: 0.25 },
    { xRatio: 0.82, yRatio: 0.72, radius: 300, solidColor: '#5F3DC4', glowColor: '#8338EC', speed: 0.0000014, amplitude: 22, depth: 0.25 },
    { xRatio: 0.58, yRatio: 0.82, radius: 180, solidColor: '#0F4C75', glowColor: '#3282B8', speed: 0.0000024, amplitude: 20, depth: 0.55 },
    { xRatio: 0.72, yRatio: 0.14, radius: 160, solidColor: '#8338EC', glowColor: '#A371F7', speed: 0.0000022, amplitude: 26, depth: 0.55 },
    { xRatio: 0.35, yRatio: 0.45, radius: 100, solidColor: '#2E86AB', glowColor: '#06FFA5', speed: 0.0000032, amplitude: 18, depth: 1.0  },
  ],
  projects: [
    { xRatio: 0.08, yRatio: 0.14, radius: 270, solidColor: '#8338EC', glowColor: '#A371F7', speed: 0.0000015, amplitude: 24, depth: 0.25 },
    { xRatio: 0.86, yRatio: 0.65, radius: 240, solidColor: '#2E86AB', glowColor: '#3282B8', speed: 0.0000013, amplitude: 20, depth: 0.25 },
    { xRatio: 0.42, yRatio: 0.86, radius: 175, solidColor: '#087E8B', glowColor: '#06C5D9', speed: 0.0000023, amplitude: 22, depth: 0.55 },
    { xRatio: 0.62, yRatio: 0.22, radius: 165, solidColor: '#5F3DC4', glowColor: '#8338EC', speed: 0.0000021, amplitude: 28, depth: 0.55 },
    { xRatio: 0.25, yRatio: 0.60, radius: 95,  solidColor: '#0F4C75', glowColor: '#3282B8', speed: 0.0000030, amplitude: 16, depth: 1.0  },
  ],
}

const bgColors: Record<string, [string, string, string]> = {
  home: ['#0D1B2A', '#111827', '#1a0f2e'],
  projects: ['#0f1a2e', '#111827', '#1a0a2e'],
}

const FADE_DURATION = 500 // ms

let fadeT = 1
let fadeStart = 0
let fromType: string = props.type
let toType: string = props.type

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Mezcla dos colores hex en proporción t (0 = color A, 1 = color B)
const lerpColor = (a: string, b: string, t: number): string => {
  const [ar, ag, ab] = hexToRgb(a)
  const [br, bg, bb] = hexToRgb(b)
  const r = Math.round(lerp(ar, br, t))
  const g = Math.round(lerp(ag, bg, t))
  const bl = Math.round(lerp(ab, bb, t))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`
}

// Ease-in-out cúbico
const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

// Devuelve la config de esferas interpolada entre fromType y toType según fadeT
const getInterpolatedSpheres = (): SphereConfig[] => {
  if (fadeT >= 1) return sphereConfigs[toType]

  const from = sphereConfigs[fromType]
  const to = sphereConfigs[toType]
  const count = Math.min(from.length, to.length)
  const t = easeInOut(fadeT)

  return Array.from({ length: count }, (_, i) => ({
    xRatio:     lerp(from[i].xRatio, to[i].xRatio, t),
    yRatio:     lerp(from[i].yRatio, to[i].yRatio, t),
    radius:     lerp(from[i].radius, to[i].radius, t),
    solidColor: lerpColor(from[i].solidColor, to[i].solidColor, t),
    glowColor:  lerpColor(from[i].glowColor, to[i].glowColor, t),
    speed:      lerp(from[i].speed, to[i].speed, t),
    amplitude:  lerp(from[i].amplitude, to[i].amplitude, t),
    depth:      lerp(from[i].depth, to[i].depth, t),
  }))
}

// Devuelve los colores del fondo interpolados
const getInterpolatedBg = (): [string, string, string] => {
  if (fadeT >= 1) return bgColors[toType]
  const f = bgColors[fromType]
  const to = bgColors[toType]
  const t = easeInOut(fadeT)
  return [lerpColor(f[0], to[0], t), lerpColor(f[1], to[1], t), lerpColor(f[2], to[2], t)]
}

// Observar cambios de tipo para disparar el fade
watch(() => props.type, (newType, oldType) => {
  fromType  = oldType
  toType    = newType
  fadeT     = 0
  fadeStart = performance.now()
})

const drawSphere = (
  ctx: CanvasRenderingContext2D,
  x: number, y: number, radius: number,
  solidColor: string, glowColor: string,
) => {
  const haloGrad = ctx.createRadialGradient(x, y, radius * 0.6, x, y, radius * 1.45)
  haloGrad.addColorStop(0, glowColor + '28')
  haloGrad.addColorStop(1, glowColor + '00')
  ctx.beginPath()
  ctx.arc(x, y, radius * 1.45, 0, Math.PI * 2)
  ctx.fillStyle = haloGrad
  ctx.fill()

  const lightX = x - radius * 0.32
  const lightY = y - radius * 0.38
  const bodyGrad = ctx.createRadialGradient(lightX, lightY, radius * 0.04, x, y, radius)
  bodyGrad.addColorStop(0, solidColor + 'FF')
  bodyGrad.addColorStop(0.45, solidColor + 'EE')
  bodyGrad.addColorStop(0.80, solidColor + 'BB')
  bodyGrad.addColorStop(1, solidColor + '66')
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = bodyGrad
  ctx.fill()

  const shadowGrad = ctx.createRadialGradient(
    x + radius * 0.28, y + radius * 0.28, radius * 0.08,
    x, y, radius,
  )
  shadowGrad.addColorStop(0, 'rgba(0,0,0,0)')
  shadowGrad.addColorStop(0.65, 'rgba(0,0,0,0)')
  shadowGrad.addColorStop(1, 'rgba(0,0,0,0.30)')
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = shadowGrad
  ctx.fill()

  const specGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, radius * 0.28)
  specGrad.addColorStop(0, 'rgba(255,255,255,0.55)')
  specGrad.addColorStop(0.5,'rgba(255,255,255,0.18)')
  specGrad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = specGrad
  ctx.fill()
}

const drawGradientBackground = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const W = canvas.width
  const H = canvas.height

  // Avanzar la transición
  if (fadeT < 1) {
    fadeT = Math.min((performance.now() - fadeStart) / FADE_DURATION, 1)
  }

  // Fondo interpolado
  const [c0, c1, c2] = getInterpolatedBg()
  const bg = ctx.createLinearGradient(0, 0, W * 0.6, H)
  bg.addColorStop(0,   c0)
  bg.addColorStop(0.5, c1)
  bg.addColorStop(1,   c2)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  const mX = background.mouseNormX.value
  const mY = background.mouseNormY.value
  const MOUSE_STRENGTH = 40

  // Esferas interpoladas
  const spheres = getInterpolatedSpheres()
  ctx.globalAlpha = 0.60

  spheres.forEach((sphere, index) => {
    const phase = index * 1.57
    const oscX  = Math.sin(time * sphere.speed + phase) * sphere.amplitude
    const oscY  = Math.cos(time * sphere.speed + phase * 0.65) * sphere.amplitude * 0.55
    const pMouseX = mX * MOUSE_STRENGTH * sphere.depth
    const pMouseY = mY * MOUSE_STRENGTH * sphere.depth

    const x = W * sphere.xRatio + oscX + pMouseX
    const y = H * sphere.yRatio + oscY + pMouseY

    drawSphere(ctx, x, y, sphere.radius, sphere.solidColor, sphere.glowColor)
  })

  ctx.globalAlpha = 1.0
}

const animate = () => {
  time = performance.now()
  if (!document.hidden) {
    drawGradientBackground()
  }
  if (!reducedMotion) {
    animationFrame = requestAnimationFrame(animate)
  }
}

const handleResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width  = window.innerWidth
    canvasRef.value.height = window.innerHeight
    drawGradientBackground()
  }
}

const handleVisibility = () => {
  if (!document.hidden) {
    drawGradientBackground()
  }
}

const reducedMotion =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width  = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }

  if (reducedMotion) {
    // Static frame respetando preferencia de movimiento reducido
    drawGradientBackground()
  } else {
    animate()
  }

  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', handleVisibility)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="background-canvas"
  />
</template>

<style scoped>
.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
}
</style>