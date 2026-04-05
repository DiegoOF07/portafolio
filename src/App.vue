<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BackgroundSystem from './components/BackgroundSystem.vue'

const route = useRoute()

// Determinar qué tipo de fondo mostrar basado en la ruta
const backgroundType = computed(() => {
  if (route.path === '/') return 'home'
  if (route.path === '/projects') return 'projects'
  if (route.path === '/contact') return 'contact'
  return 'home'
})
</script>

<template>
  <div id="app">
    <!-- Sistema de fondos dinámico basado en la ruta -->
    <BackgroundSystem :type="backgroundType" />

    <Navbar />

    <div class="router-view-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#app {
  width: 100dvw;
  min-height: 100dvh;
  position: relative;
  overflow-x: hidden;
}

:deep(.router-view-content) {
  position: relative;
  z-index: 10;
  padding-top: 4.5rem;
}
</style>