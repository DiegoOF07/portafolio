<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MetricCounter from './MetricCounter.vue'
import { useLocale } from '@/i18n'
import { useVisitProgress } from '@/composables/useVisitProgress'
import { featuredProjects } from '@/data/projects'
import { SECTION_IDS } from '@/data/sections'
import { formatElapsed } from '@/lib/visit'

const { m } = useLocale()
const { state } = useVisitProgress()

// Contacto queda fuera: está después de esta pantalla y al llegar aquí todavía no se ha visto
const COUNTED_SECTIONS = SECTION_IDS.filter((id) => id !== 'contacto')

const rows = computed(() => [
  { label: m.value.results.projects, value: `${state.value.projects.length}/${featuredProjects.length}`, dim: false },
  {
    label: m.value.results.sections,
    value: `${state.value.sections.filter((id) => (COUNTED_SECTIONS as string[]).includes(id)).length}/${COUNTED_SECTIONS.length}`,
    dim: false,
  },
  { label: m.value.results.secrets, value: `${state.value.secrets}/1`, dim: state.value.secrets === 0 },
])

const root = ref<HTMLElement>()
// Cuántas filas ya empezaron a contar: suben una por una, como en Doom
const played = ref(0)
const now = ref(Date.now())
const elapsed = computed(() => formatElapsed(now.value - state.value.startedAt))

let observer: IntersectionObserver | undefined
let clock: ReturnType<typeof setInterval> | undefined
const stagger: ReturnType<typeof setTimeout>[] = []

// El reloj solo corre mientras la pantalla se ve
const onVisible = (visible: boolean) => {
  clearInterval(clock)
  if (!visible) return
  now.value = Date.now()
  clock = setInterval(() => (now.value = Date.now()), 1000)
  if (played.value > 0) return
  rows.value.forEach((_, i) => stagger.push(setTimeout(() => (played.value = i + 1), i * 150)))
}

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => onVisible(!!entry?.isIntersecting), { threshold: 0.4 })
  if (root.value) observer.observe(root.value)
})

onUnmounted(() => {
  observer?.disconnect()
  clearInterval(clock)
  stagger.forEach(clearTimeout)
})
</script>

<template>
  <section ref="root" class="results" aria-labelledby="results-title">
    <p class="kicker">{{ m.results.kicker }}</p>
    <h2 id="results-title">{{ m.results.title }}</h2>

    <table>
      <tbody>
        <tr v-for="(row, i) in rows" :key="row.label" :class="{ dim: row.dim }">
          <th scope="row">{{ row.label }}</th>
          <td><MetricCounter :value="row.value" :play="played > i" /></td>
        </tr>
        <!-- El tiempo cambia cada segundo: se muestra directo, sin conteo -->
        <tr>
          <th scope="row">{{ m.results.time }}</th>
          <td><span class="time">{{ elapsed }}</span></td>
        </tr>
      </tbody>
    </table>

    <p class="note">{{ m.results.note }}</p>
    <a href="#contacto" class="btn-primary">{{ m.results.next }}&nbsp;<span aria-hidden="true">→</span></a>
  </section>
</template>

<style scoped>
.results {
  max-width: 34rem;
  margin: var(--s-8) auto;
  padding: var(--s-7) var(--s-6);
  border: 1px solid var(--line);
  border-radius: var(--r-surface);
  background: var(--surface) repeating-linear-gradient(0deg, #ffffff04 0 2px, transparent 2px 4px);
  text-align: center;
}

.kicker {
  margin: 0 0 var(--s-2);
  font-family: var(--font-pixel);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--label);
}

h2 {
  margin: 0 0 var(--s-6);
  font-size: var(--step-3);
}

table {
  width: 100%;
  max-width: 22rem;
  margin: 0 auto var(--s-5);
  border-collapse: collapse;
}

th,
td {
  padding: var(--s-2) 0;
  border-bottom: 1px dashed var(--line);
}

th {
  text-align: left;
  font-family: var(--font-pixel);
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--text-dim);
}

td {
  text-align: right;
  font-size: var(--step-1);
}

.dim td :deep(.metric) {
  color: var(--text-faint);
}

.time {
  font-family: var(--font-hud);
  font-size: 1.6em;
  line-height: 1;
  color: var(--act);
  font-variant-numeric: tabular-nums;
}

/* En bloque y no en flex: si el texto se parte en dos líneas, la flecha lo sigue */
.btn-primary {
  display: inline-block;
}

.note {
  margin: 0 0 var(--s-6);
  font-size: var(--step--1);
  color: var(--text-faint);
}

@media (max-width: 600px) {
  .results {
    margin-inline: 1rem;
    padding: var(--s-6) var(--s-4);
  }
}
</style>
