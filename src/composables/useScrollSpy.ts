import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollSpy = (sectionIds: readonly string[]) => {
  const activeId = ref<string>(sectionIds[0] ?? '')
  let ticking = false

  // Se releen en cada scroll porque las secciones pueden montarse después (son pocas)
  const resolveElements = (): HTMLElement[] =>
    sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

  // Activa: la última sección cuyo borde superior cruzó el 40 % del alto de la ventana
  const computeActive = (els: HTMLElement[]) => {
    const marker = window.innerHeight * 0.4
    let current = sectionIds[0]

    for (const el of els) {
      if (el.getBoundingClientRect().top <= marker) {
        current = el.id
      } else {
        break
      }
    }

    // Al fondo del documento la última sección puede no alcanzar esa línea
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = els[els.length - 1]?.id ?? current
    }

    activeId.value = current
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      computeActive(resolveElements())
      ticking = false
    })
  }

  onMounted(() => {
    computeActive(resolveElements())
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return { activeId }
}