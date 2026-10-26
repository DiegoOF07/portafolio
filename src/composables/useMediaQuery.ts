import { ref, readonly, onMounted, onUnmounted } from 'vue'

export const useMediaQuery = (query: string) => {
  // Sin SSR: se puede leer al crear, así nada parpadea antes de montar
  const mql = window.matchMedia(query)
  const matches = ref(mql.matches)
  const update = () => {
    matches.value = mql.matches
  }

  onMounted(() => mql.addEventListener('change', update))
  onUnmounted(() => mql.removeEventListener('change', update))

  return readonly(matches)
}
