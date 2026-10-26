import { ref, readonly, computed } from 'vue'
import { parseVisit, markSection as addSection, markProject as addProject, markSecret, type VisitState } from '@/lib/visit'

const STORAGE_KEY = 'visit-progress-v1'

// sessionStorage puede no existir o lanzar (modo privado, cookies bloqueadas)
const load = (): VisitState => {
  let raw: string | null = null
  try {
    raw = sessionStorage.getItem(STORAGE_KEY)
  } catch {
    // sin almacenamiento: la visita vive solo en memoria
  }
  return parseVisit(raw, Date.now())
}

const state = ref<VisitState>(load())
const justUnlocked = ref(false)
const secretFound = computed(() => state.value.secrets === 1)

const commit = (next: VisitState) => {
  state.value = next
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // igual que en load
  }
}

// Solo se escribe cuando algo cambia: el scroll llama a esto muchas veces
const markSection = (id: string) => {
  if (!state.value.sections.includes(id)) commit(addSection(state.value, id))
}

const markProject = (slug: string) => {
  if (!state.value.projects.includes(slug)) commit(addProject(state.value, slug))
}

const unlockSecret = () => {
  if (secretFound.value) return
  commit(markSecret(state.value))
  justUnlocked.value = true
}

export const useVisitProgress = () => ({
  state: readonly(state),
  markSection,
  markProject,
  unlockSecret,
  secretFound,
  justUnlocked,
})
