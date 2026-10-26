<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { SECTION_IDS } from '@/data/sections'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useVisitProgress } from '@/composables/useVisitProgress'
import { useSecret } from '@/composables/useSecret'

const route = useRoute()
const { markSection } = useVisitProgress()
const { activeId: spiedId, setActiveId } = useScrollSpy(SECTION_IDS)
useSecret()

// En el detalle de un proyecto no hay secciones: se queda en "proyectos"
const activeId = computed(() => (route.meta.page === 'project' ? 'proyectos' : spiedId.value))

// También reacciona al volver a la home, aunque la sección espiada no cambie
watch([spiedId, () => route.meta.page], ([id, page]) => {
  if (page === 'home') markSection(id)
}, { immediate: true })
</script>

<template>
  <div id="app">
    <Navbar :active-id="activeId" @navigate="setActiveId" />

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
