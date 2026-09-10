import { ref, onMounted, onUnmounted } from 'vue'

// Posición normalizada del mouse para el parallax del fondo:
// 0 = centro, −1 = borde izq/sup, +1 = borde der/inf.
export const useBackground = () => {
  const mouseNormX = ref(0)
  const mouseNormY = ref(0)

  const handleMouseMove = (e: MouseEvent) => {
    mouseNormX.value = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseNormY.value = (e.clientY / window.innerHeight - 0.5) * 2
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return { mouseNormX, mouseNormY }
}
