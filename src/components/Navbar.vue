<script setup lang="ts">
import { ref } from 'vue'
import { Home, Phone, BookOpen, Menu, X } from 'lucide-vue-next'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">Diego Flores</div>

    <button class="menu-btn" @click="toggleMenu">
      <component :is="isOpen ? X : Menu" :size="28" />
    </button>

    <ul :class="['nav-links', { open: isOpen }]">
      <li><RouterLink to="/" exact-active-class="active" class="nav-link" @click="isOpen = false"><Home /> <span>Principal</span></RouterLink></li>
      <li><RouterLink to="/projects" exact-active-class="active" class="nav-link" @click="isOpen = false"><BookOpen /> <span>Proyectos</span></RouterLink></li>
      <li><RouterLink to="/contact" exact-active-class="active" class="nav-link" @click="isOpen = false"><Phone /> <span>Contacto</span></RouterLink></li>
    </ul>
  </nav>
</template>


<script lang="ts" setup>
</script>

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
  background: rgba(13, 27, 42, 0.45);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
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
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.nav-link:hover {
  background: var(--glass-bg-hover);
  border-color: rgba(255, 255, 255, 0.10);
  color: var(--color-text-primary);
}

.active {
  background: var(--glass-bg);
  border-color: rgba(255, 255, 255, 0.12);
  color: var(--color-text-primary);
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

    /* Glassmorphism en el desplegable móvil */
    background: rgba(13, 27, 42, 0.75);
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