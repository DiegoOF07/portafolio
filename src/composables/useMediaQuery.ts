import { ref, readonly, onMounted, onUnmounted } from 'vue'

export const useMediaQuery = (query: string) => {
  const matches = ref(false)
  let mql: MediaQueryList | undefined
  const update = () => {
    matches.value = mql?.matches ?? false
  }

  onMounted(() => {
    mql = window.matchMedia(query)
    update()
    mql.addEventListener('change', update)
  })

  onUnmounted(() => mql?.removeEventListener('change', update))

  return readonly(matches)
}
