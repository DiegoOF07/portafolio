import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollSpy = (sectionIds: string[]) => {
  const activeId = ref<string>(sectionIds[0] ?? '')
  let ticking = false

  // Resuelve las secciones de forma perezosa: los elementos pueden montarse
  // después que la navbar, así que se releen en cada scroll (barato: son pocos).
  const resolveElements = (): HTMLElement[] =>
    sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

  // Marca como activa la última sección cuya parte superior haya cruzado
  // la línea imaginaria al 40% del alto del viewport.
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

    // Por si llegamos al fondo del documento y la última sección
    // no alcanzó la línea (borde inferior por debajo del viewport).
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

  const setActiveId = (id: string) => {
    activeId.value = id
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

  return { activeId, setActiveId }
}