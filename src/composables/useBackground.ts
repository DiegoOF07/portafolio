import { ref, onMounted, onUnmounted } from 'vue'

export interface BackgroundConfig {
  type: 'home' | 'projects' | 'contact'
  parallaxIntensity?: number
  animationSpeed?: number
}

export const useBackground = (config: BackgroundConfig) => {
  const scrollY        = ref(0)
  const mouseX         = ref(0)
  const mouseY         = ref(0)
  const parallaxOffset = ref(0)

  // Posición normalizada del mouse: −1 a +1 desde el centro de la ventana
  const mouseNormX = ref(0)
  const mouseNormY = ref(0)

  const configByType = {
    home: {
      primaryColor:      'var(--color-gradient-1)',
      secondaryColor:    'var(--color-gradient-4)',
      animationSpeed:    1,
      parallaxIntensity: 0.12,
    },
    projects: {
      primaryColor:      'var(--color-gradient-4)',
      secondaryColor:    'var(--color-gradient-2)',
      animationSpeed:    1,
      parallaxIntensity: 0.12,
    },
    contact: {
      primaryColor:      'var(--color-gradient-6)',
      secondaryColor:    'var(--color-gradient-4)',
      animationSpeed:    1,
      parallaxIntensity: 0.12,
    },
  }

  const currentConfig = configByType[config.type]

  const handleScroll = () => {
    scrollY.value        = window.scrollY
    parallaxOffset.value = scrollY.value * (config.parallaxIntensity ?? currentConfig.parallaxIntensity)
  }

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
    // Normalizar: 0 = centro, −1 = borde izq/sup, +1 = borde der/inf
    mouseNormX.value = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseNormY.value = (e.clientY / window.innerHeight - 0.5) * 2
  }

  onMounted(() => {
    window.addEventListener('scroll',    handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll',    handleScroll)
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return {
    scrollY,
    parallaxOffset,
    mouseX,
    mouseY,
    mouseNormX,
    mouseNormY,
    ...currentConfig,
  }
}