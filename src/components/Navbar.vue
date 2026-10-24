<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Home, User, FolderGit2, Layers, FlaskConical, Phone, Menu, X, Download } from 'lucide-vue-next'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useLocale, homeRoute, CV_FILES } from '@/i18n'

const isOpen = ref(false)
const route = useRoute()
const { locale, m, alternate } = useLocale()
const otherLocale = computed(() => (locale.value === 'es' ? 'en' : 'es'))

// Mismos ids en ambos idiomas
const navItems = [
  { id: 'inicio', icon: Home },
  { id: 'sobre-mi', icon: User },
  { id: 'proyectos', icon: FolderGit2 },
  { id: 'stack', icon: Layers },
  { id: 'experimentos', icon: FlaskConical },
  { id: 'contacto', icon: Phone },
] as const

// El scroll-spy solo tiene sentido en la home (donde viven las secciones).
const isHome = computed(() => route.meta.page === 'home')
const { activeId, setActiveId } = useScrollSpy(navItems.map((i) => i.id))

const isItemActive = (itemId: string) => {
  // En el detalle de un proyecto, la sección "Proyectos" se mantiene activa.
  if (itemId === 'proyectos' && route.meta.page === 'project') return true
  return isHome.value && activeId.value === itemId
}

const handleClick = (itemId: string) => {
  setActiveId(itemId)
  closeMenu()
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <nav class="navbar">
    <RouterLink :to="homeRoute(locale, 'inicio')" class="logo">Diego Flores</RouterLink>

    <ul :class="['nav-links', { open: isOpen }]">
      <li v-for="item in navItems" :key="item.id">
        <RouterLink
          :to="homeRoute(locale, item.id)"
          class="nav-link"
          :class="{ active: isItemActive(item.id) }"
          @click="handleClick(item.id)"
        >
          <component :is="item.icon" :size="18" />
          <span>{{ m.nav[item.id] }}</span>
        </RouterLink>
      </li>
    </ul>

    <div class="nav-right">
      <RouterLink :to="alternate" class="nav-lang" :hreflang="otherLocale" :lang="otherLocale" :title="m.nav.switchAria" @click="closeMenu">
        {{ m.nav.switchLabel }}
      </RouterLink>
      <a :href="CV_FILES[locale]" download class="nav-cv" :aria-label="m.nav.downloadCv">
        <Download :size="18" />
        <span>CV</span>
      </a>
      <button class="menu-btn" :aria-label="isOpen ? m.nav.closeMenu : m.nav.openMenu" @click="toggleMenu">
        <component :is="isOpen ? X : Menu" :size="28" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--field-navy) 55%, transparent);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
}

.logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: 112%;
  color: var(--ink);
  letter-spacing: -0.01em;
  text-decoration: none;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--ink);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-cv {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  color: var(--ink);
  background: var(--glass-bg);
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: background 0.2s, border-color 0.2s;
}

/* Sin borde: el CV sigue siendo la acción principal */
.nav-lang {
  padding: 8px 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: var(--ink-dim);
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}

.nav-lang:hover {
  color: var(--ink);
  background: var(--glass-bg-hover);
}

.nav-cv:hover {
  background: var(--glass-bg-hover);
  border-color: rgba(255, 255, 255, 0.22);
}

.nav-link:focus-visible,
.nav-cv:focus-visible,
.nav-lang:focus-visible,
.menu-btn:focus-visible,
.logo:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  transition: max-height 0.35s ease, padding 0.35s ease;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-dim);
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.nav-link:hover {
  background: var(--glass-bg-hover);
  border-color: rgba(255, 255, 255, 0.10);
  color: var(--ink);
}

.active {
  background: var(--glass-bg);
  border-color: rgba(255, 255, 255, 0.12);
  color: var(--ink);
}

@media (max-width: 999px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    padding: 0;
    margin: 0;

    background: var(--chrome-bg-strong);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  .nav-links.open {
    max-height: 500px;
    padding: 0.75rem 0;
  }

  .nav-link {
    justify-content: center;
    padding: 0.75rem 0;
    width: 100%;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .nav-link:hover,
  .active {
    background: rgba(255, 255, 255, 0.06);
    border-color: transparent;
  }
}
</style>
