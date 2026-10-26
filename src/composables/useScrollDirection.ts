import { ref, readonly, onMounted, onUnmounted } from 'vue'

// Ignora temblores de pocos píxeles (trackpad, rebote de iOS)
const THRESHOLD = 4

export const useScrollDirection = () => {
  const direction = ref<'up' | 'down'>('down')
  let lastY = 0

  const onScroll = () => {
    const y = window.scrollY
    if (Math.abs(y - lastY) < THRESHOLD) return
    direction.value = y > lastY ? 'down' : 'up'
    lastY = y
  }

  onMounted(() => {
    lastY = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return readonly(direction)
}
