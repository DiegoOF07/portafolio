import { ref, readonly, onMounted, onUnmounted } from 'vue'
import { formatClock } from '@/lib/clock'

export const useClock = () => {
  const time = ref(formatClock(new Date()))
  let timer: ReturnType<typeof setTimeout> | undefined

  // Se alinea al cambio de minuto para no mostrar la hora con hasta 59 s de atraso
  const schedule = () => {
    const now = new Date()
    time.value = formatClock(now)
    timer = setTimeout(schedule, 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()))
  }

  onMounted(schedule)
  onUnmounted(() => clearTimeout(timer))

  return readonly(time)
}
