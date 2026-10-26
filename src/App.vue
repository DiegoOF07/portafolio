<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="app">
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