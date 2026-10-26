import { onMounted, onUnmounted } from 'vue'
import { createCheatDetector } from '@/lib/cheat'
import { useVisitProgress } from './useVisitProgress'

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && !!target.closest('input, textarea, [contenteditable]')

export const useSecret = () => {
  const { unlockSecret } = useVisitProgress()
  const detect = createCheatDetector()

  const onKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return
    if (detect(e.key)) unlockSecret()
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
}
