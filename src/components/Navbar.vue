<script setup lang="ts">
import { ref, computed } from 'vue'
import { Home, User, FolderGit2, Layers, FlaskConical, Phone, Menu, X, Download } from 'lucide-vue-next'
import { useLocale, homeRoute, CV_FILES } from '@/i18n'
import { SECTION_IDS, type SectionId } from '@/data/sections'

defineProps<{ activeId: string }>()
const emit = defineEmits<{ navigate: [id: SectionId] }>()

const isOpen = ref(false)
const { locale, m, alternate } = useLocale()
const otherLocale = computed(() => (locale.value === 'es' ? 'en' : 'es'))

const icons = { inicio: Home, 'sobre-mi': User, proyectos: FolderGit2, stack: Layers, experimentos: FlaskConical, contacto: Phone }

const handleClick = (id: SectionId) => {
  emit('navigate', id)
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
      <li v-for="id in SECTION_IDS" :key="id">
        <RouterLink
          :to="homeRoute(locale, id)"
          class="nav-link"
          :class="{ active: activeId === id }"
          @click="handleClick(id)"
        >
          <component :is="icons[id]" :size="18" />
          <span>{{ m.nav[id] }}</span>
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
  background: color-mix(in srgb, var(--bg) 93%, transparent);
  border-bottom: 1px solid var(--line);
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
  border-radius: var(--r-control);
  text-decoration: none;
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--ink);
  border: 1px solid var(--act);
  transition: background 0.2s, border-color 0.2s;
}

/* Sin borde: el CV sigue siendo la acción principal */
.nav-lang {
  padding: 8px 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}

.nav-lang:hover {
  color: var(--ink);
  background: var(--surface);
}

.nav-cv:hover {
  color: var(--ink);
  background: var(--surface);
}

.nav-link:focus-visible,
.nav-cv:focus-visible,
.nav-lang:focus-visible,
.menu-btn:focus-visible,
.logo:focus-visible {
  outline: 2px solid var(--label);
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
  color: var(--text-dim);
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.nav-link:hover {
  background: var(--surface);
  border-color: var(--line);
  color: var(--ink);
}

.active {
  border-color: var(--act);
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

    background: var(--bg);
    border-bottom: 1px solid var(--line);
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
    border-bottom: 1px solid var(--line);
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .nav-link:hover,
  .active {
    background: var(--surface);
    border-color: transparent;
  }
}
</style>
