<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Automap from './components/Automap.vue'
import { SECTION_IDS } from '@/data/sections'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useVisitProgress } from '@/composables/useVisitProgress'
import { useSecret } from '@/composables/useSecret'
import { useMediaQuery } from '@/composables/useMediaQuery'

const route = useRoute()
const { state, secretFound, justUnlocked, markSection, unlockSecret } = useVisitProgress()
const { activeId: spiedId } = useScrollSpy(SECTION_IDS)
useSecret()
const wide = useMediaQuery('(min-width: 1100px)')

// Ya encontrado, volver a tocarlo solo vuelve a mostrar la nota
const onSecret = () => {
  if (secretFound.value) justUnlocked.value = true
  else unlockSecret()
}

// En el detalle de un proyecto no hay secciones: se queda en "proyectos"
const activeId = computed(() => (route.meta.page === 'project' ? 'proyectos' : spiedId.value))

// También reacciona al volver a la home, aunque la sección espiada no cambie
watch([spiedId, () => route.meta.page], ([id, page]) => {
  if (page === 'home') markSection(id)
}, { immediate: true })
</script>

<template>
  <div id="app">
    <Navbar :active-id="activeId" :visited="state.sections" :secret-found="secretFound" @secret="onSecret" />

    <aside v-if="wide" class="automap-column">
      <Automap
        :active-id="activeId"
        :visited="state.sections"
        :secret-found="secretFound"
        layout="column"
        @secret="onSecret"
      />
    </aside>

    <div class="router-view-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#app {
  --automap-w: 200px;
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
  padding-top: var(--nav-h);
}

.automap-column {
  position: fixed;
  top: var(--nav-h);
  left: 0;
  bottom: 0;
  z-index: 20;
  width: var(--automap-w);
  padding: 1.5rem 0 1.5rem 6px;
  overflow-y: auto;
  border-right: 1px solid var(--line);
  background: var(--bg);
}

@media (min-width: 1100px) {
  :deep(.router-view-content) {
    padding-left: var(--automap-w);
  }
}
</style>
