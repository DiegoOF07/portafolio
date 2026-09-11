<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BackgroundSystem from './components/BackgroundSystem.vue'

const route = useRoute()

// Determinar qué tipo de fondo mostrar basado en la ruta.
// La home es una SPA de una sola sección de fondo; el detalle de proyecto
// usa una variante propia.
const backgroundType = computed(() => {
  if (route.name === 'ProjectDetail') return 'projects'
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
  /* clip, no hidden: hidden convierte a #app en un contenedor de scroll que
     nunca se desplaza, y rompe sticky y las animaciones ligadas al scroll. */
  overflow-x: clip;
}

:deep(.router-view-content) {
  position: relative;
  z-index: 10;
  padding-top: 4.5rem;
}
</style>