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
  background-color: var(--hover-background);
  padding: 1rem 2rem;
  position: relative;
  z-index: 50;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
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
  gap: 1.5rem;
  list-style: none;
  transition: all 1s ease;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #bbb;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: var(--color-secondary);
  color: var(--color-text-secondary);
}

.active {
  background: var(--color-background);
}

@media (max-width: 999px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--hover-background);
    width: 100%;
    max-height: 0;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  .nav-links.open {
    max-height: 500px;
    padding: 1rem 0;
  }

  .nav-link {
    justify-content: center;
    padding: 0.75rem 0;
    width: 100%;
  }
}
</style>
