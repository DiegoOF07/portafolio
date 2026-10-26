<script setup lang="ts">
import { computed } from 'vue'
import { SECTION_IDS, type SectionId } from '@/data/sections'
import { useLocale, homeRoute } from '@/i18n'

type LayoutName = 'column' | 'grid'
type Box = { x: number; y: number; w: number; h: number }
type Layout = {
  width: number
  height: number
  rooms: Record<SectionId, Box>
  corridors: { from: SectionId; to: SectionId; d: string }[]
  wall: Box
  secret: Box
  secretCorridor: string
}

const props = defineProps<{
  activeId: string
  visited: readonly string[]
  secretFound: boolean
  layout: LayoutName
}>()
const emit = defineEmits<{ navigate: [id: SectionId]; secret: [] }>()

const { locale, m } = useLocale()

// Columna: habitaciones apiladas con la etiqueta a la derecha. Rejilla: etiqueta dentro.
const LAYOUTS: Record<LayoutName, Layout> = {
  column: {
    width: 188,
    height: 390,
    rooms: {
      inicio: { x: 12, y: 8, w: 50, h: 36 },
      'sobre-mi': { x: 12, y: 58, w: 50, h: 36 },
      proyectos: { x: 6, y: 108, w: 62, h: 60 },
      stack: { x: 12, y: 182, w: 50, h: 36 },
      experimentos: { x: 12, y: 232, w: 50, h: 36 },
      contacto: { x: 12, y: 282, w: 50, h: 36 },
    },
    corridors: [
      { from: 'inicio', to: 'sobre-mi', d: 'M37 44 V58' },
      { from: 'sobre-mi', to: 'proyectos', d: 'M37 94 V108' },
      { from: 'proyectos', to: 'stack', d: 'M37 168 V182' },
      { from: 'stack', to: 'experimentos', d: 'M37 218 V232' },
      { from: 'experimentos', to: 'contacto', d: 'M37 268 V282' },
    ],
    wall: { x: 25, y: 318, w: 24, h: 28 },
    secret: { x: 12, y: 346, w: 50, h: 36 },
    secretCorridor: 'M37 318 V346',
  },
  grid: {
    width: 280,
    height: 266,
    rooms: {
      inicio: { x: 0, y: 0, w: 120, h: 40 },
      'sobre-mi': { x: 150, y: 0, w: 130, h: 40 },
      proyectos: { x: 40, y: 70, w: 240, h: 56 },
      stack: { x: 0, y: 156, w: 110, h: 40 },
      experimentos: { x: 140, y: 156, w: 140, h: 40 },
      contacto: { x: 140, y: 226, w: 140, h: 40 },
    },
    corridors: [
      { from: 'inicio', to: 'sobre-mi', d: 'M120 20 H150' },
      { from: 'sobre-mi', to: 'proyectos', d: 'M215 40 V70' },
      { from: 'proyectos', to: 'stack', d: 'M55 126 V156' },
      { from: 'stack', to: 'experimentos', d: 'M110 176 H140' },
      { from: 'experimentos', to: 'contacto', d: 'M210 196 V226' },
    ],
    wall: { x: 113, y: 232, w: 24, h: 28 },
    secret: { x: 0, y: 226, w: 110, h: 40 },
    secretCorridor: 'M110 246 H140',
  },
}
const geo = computed(() => LAYOUTS[props.layout])

const place = (b: Box) => ({ left: `${b.x}px`, top: `${b.y}px`, width: `${b.w}px`, height: `${b.h}px` })

// En la columna todas las etiquetas arrancan en la misma x, a la derecha de la habitación más ancha
const LABEL_X = 80
const labelStyle = (b: Box) =>
  props.layout === 'column' ? { left: `${LABEL_X - b.x}px`, width: `${geo.value.width - LABEL_X}px` } : undefined

const isVisited = (id: string) => props.visited.includes(id)
</script>

<template>
  <nav
    :class="['automap', `automap--${layout}`]"
    :aria-label="m.automap.label"
    :style="{ width: `${geo.width}px`, height: `${geo.height}px` }"
  >
    <svg class="corridors" :viewBox="`0 0 ${geo.width} ${geo.height}`" aria-hidden="true">
      <path
        v-for="c in geo.corridors"
        :key="c.d"
        :d="c.d"
        :class="{ walked: isVisited(c.from) && isVisited(c.to) }"
      />
      <path v-if="secretFound" :d="geo.secretCorridor" class="walked" />
    </svg>

    <RouterLink
      v-for="id in SECTION_IDS"
      :key="id"
      :to="homeRoute(locale, id)"
      :class="['room', { visited: isVisited(id), active: activeId === id }]"
      :style="place(geo.rooms[id])"
      :aria-current="activeId === id ? 'location' : undefined"
      @click="emit('navigate', id)"
    >
      <span v-if="activeId === id" class="arrow" aria-hidden="true"></span>
      <span class="label" :style="labelStyle(geo.rooms[id])">
        {{ m.nav[id] }}
      </span>
    </RouterLink>

    <button
      v-if="!secretFound"
      type="button"
      class="wall"
      :style="place(geo.wall)"
      :aria-label="m.automap.wall"
      @click="emit('secret')"
    ></button>
    <button v-else type="button" class="room secret" :style="place(geo.secret)" @click="emit('secret')">
      <span class="label" :style="labelStyle(geo.secret)">
        {{ m.automap.secretRoom }}
      </span>
    </button>
  </nav>
</template>

<style scoped>
.automap {
  --room-dim: #7a5a4a;
  position: relative;
  flex-shrink: 0;
  font-family: var(--font-pixel);
  font-size: 10px;
  text-transform: uppercase;
}

.corridors {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--room-dim);
  stroke-width: 2;
  shape-rendering: crispEdges;
}

.corridors .walked {
  stroke: var(--label);
}

.room {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 2px solid var(--room-dim);
  background: var(--bg);
  color: var(--text-dim);
  text-decoration: none;
  font: inherit;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s, color 0.2s;
}

.room.visited,
.room.active {
  border-color: var(--act);
}

.room:hover,
.room.active {
  color: var(--ink);
}

.room.secret {
  border-color: var(--label);
  color: var(--label);
}

.room:focus-visible,
.wall:focus-visible {
  outline: 2px solid var(--label);
  outline-offset: 2px;
}

.label {
  white-space: nowrap;
  overflow: hidden;
}

/* La flecha del jugador, como en el automapa de Doom */
.arrow {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  background: var(--ink);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}

.automap--column .label {
  position: absolute;
  text-align: left;
  top: 50%;
  transform: translateY(-50%);
}

/* Parece una pared más del pasillo; solo el borde punteado la delata */
.wall {
  position: absolute;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.wall::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  border-color: var(--room-dim);
  border-style: dashed;
  border-width: 0;
}

.automap--column .wall::before {
  width: 0;
  height: 14px;
  border-left-width: 2px;
}

.automap--grid .wall::before {
  width: 14px;
  height: 0;
  border-top-width: 2px;
}

.wall:hover::before {
  border-color: var(--label);
}
</style>
