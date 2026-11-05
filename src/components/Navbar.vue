<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Menu, X, Download } from 'lucide-vue-next'
import Automap from './Automap.vue'
import StatusBar from './StatusBar.vue'
import { useLocale, homeRoute, CV_FILES } from '@/i18n'
import { useMediaQuery } from '@/composables/useMediaQuery'

defineProps<{ activeId: string; visited: readonly string[]; secretFound: boolean }>()
const emit = defineEmits<{ secret: [] }>()

const route = useRoute()
const { locale, m, alternate } = useLocale()
const otherLocale = computed(() => (locale.value === 'es' ? 'en' : 'es'))
const isDetail = computed(() => route.meta.page === 'project')
const wide = useMediaQuery('(min-width: 1100px)')

const isOpen = ref(false)
const header = ref<HTMLElement>()
const panel = ref<HTMLElement>()
const menuBtn = ref<HTMLButtonElement>()

// Lo que queda detrás del panel no recibe foco ni lectura mientras está abierto
const setPageInert = (inert: boolean) => {
  for (const el of header.value?.parentElement?.children ?? []) {
    if (el !== header.value) (el as HTMLElement).inert = inert
  }
}

const closeMenu = () => {
  isOpen.value = false
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMenu()
}

// Con el panel abierto la página de atrás no se desplaza
watch(isOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  setPageInert(open)
  if (open) {
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    panel.value?.querySelector<HTMLElement>('.room')?.focus()
  } else {
    window.removeEventListener('keydown', onKeydown)
    // El foco estaba en el panel que desaparece: vuelve al botón en vez de caer en <body>
    const hadFocus = !!panel.value?.contains(document.activeElement)
    await nextTick()
    if (hadFocus) menuBtn.value?.focus({ preventScroll: true })
  }
})

// Cualquier cambio de ruta (logo, Volver, atrás del navegador) cierra el panel
watch(() => route.fullPath, closeMenu)

// Si la ventana crece hasta tener la columna del automapa, el panel sobra
watch(wide, (isWide) => isWide && closeMenu())

onUnmounted(() => {
  document.body.style.overflow = ''
  setPageInert(false)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header ref="header" class="navbar">
    <div class="nav-left">
      <RouterLink :to="homeRoute(locale, 'inicio')" class="logo">Diego Flores</RouterLink>
      <RouterLink v-if="isDetail" :to="homeRoute(locale, 'proyectos')" class="nav-back">
        <ArrowLeft :size="16" aria-hidden="true" /> <span class="nav-back-text">{{ m.nav.back }}</span>
      </RouterLink>
    </div>

    <StatusBar class="nav-status" />

    <div class="nav-right">
      <RouterLink :to="alternate" class="nav-lang" :hreflang="otherLocale" :lang="otherLocale" :title="m.nav.switchAria" @click="closeMenu">
        {{ m.nav.switchLabel }}
      </RouterLink>
      <a :href="CV_FILES[locale]" download class="nav-cv" :aria-label="m.nav.downloadCv">
        <Download :size="18" aria-hidden="true" />
        <span>CV</span>
      </a>
      <button
        v-if="!wide"
        ref="menuBtn"
        class="menu-btn"
        :aria-label="isOpen ? m.nav.closeMenu : m.nav.openMenu"
        :aria-expanded="isOpen"
        aria-controls="nav-panel"
        @click="isOpen = !isOpen"
      >
        <component :is="isOpen ? X : Menu" :size="28" />
      </button>
    </div>

    <div v-if="isOpen" id="nav-panel" ref="panel" class="nav-panel">
      <Automap
        :active-id="activeId"
        :visited="visited"
        :secret-found="secretFound"
        layout="grid"
        @navigate="closeMenu"
        @secret="emit('secret')"
      />
      <a :href="CV_FILES[locale]" download class="panel-cv">
        <Download :size="16" aria-hidden="true" /> {{ m.nav.downloadCv }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'left status right';
  align-items: center;
  column-gap: 1rem;
  --nav-pad: 2rem;
  height: var(--nav-h);
  padding: 0 var(--nav-pad);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 93%, transparent);
  border-bottom: 1px solid var(--line);
}

.nav-left {
  grid-area: left;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  min-width: 0;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: 112%;
  color: var(--ink);
  letter-spacing: -0.01em;
  text-decoration: none;
  white-space: nowrap;
}

.nav-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-dim);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.nav-back:hover {
  color: var(--ink);
}

.nav-status {
  grid-area: status;
  justify-content: center;
}

/* Bajo 1100px la barra de estado baja a una franja propia */
@media (max-width: 1099px) {
  .navbar {
    grid-template-columns: 1fr auto;
    grid-template-rows: 4.5rem 1fr;
    grid-template-areas: 'left right' 'status status';
  }

  /* La franja cruza todo el ancho, por encima del padding de la navbar */
  .nav-status {
    height: 100%;
    margin: 0 calc(-1 * var(--nav-pad));
    padding: 0 var(--nav-pad);
    border-top: 1px solid var(--line);
  }
}

.nav-right {
  grid-area: right;
  justify-content: end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Sin borde: el CV sigue siendo la acción principal */
.nav-lang {
  padding: 8px 10px;
  border-radius: var(--r-control);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}

.nav-cv {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--r-control);
  text-decoration: none;
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--ink);
  border: 1px solid var(--act);
  transition: background 0.2s;
}

.nav-lang:hover,
.nav-cv:hover {
  color: var(--ink);
  background: var(--surface);
}

.menu-btn {
  display: block;
  background: none;
  border: none;
  color: var(--ink);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--r-control);
}

.nav-back:focus-visible,
.nav-cv:focus-visible,
.nav-lang:focus-visible,
.menu-btn:focus-visible,
.logo:focus-visible,
.panel-cv:focus-visible {
  outline: 2px solid var(--label);
  outline-offset: 2px;
}

/* Bajo la navbar, a pantalla completa */
.nav-panel {
  position: fixed;
  top: var(--nav-h);
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 1rem;
  overflow-y: auto;
  background: var(--bg);
}

.panel-cv {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 280px;
  font-family: var(--font-pixel);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
}

/* En teléfono el CV vive dentro del menú para que la barra no se desborde */
@media (max-width: 599px) {
  .navbar {
    --nav-pad: 1rem;
  }

  .nav-cv {
    display: none;
  }
}

/* Muy angosto: solo la flecha; el texto queda para lectores de pantalla */
@media (max-width: 399px) {
  .nav-left {
    gap: 0.75rem;
  }

  .nav-back-text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
</style>
