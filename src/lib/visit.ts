export interface VisitState {
  startedAt: number
  sections: string[]
  projects: string[]
  secrets: number
}

export const newVisit = (now: number): VisitState => ({ startedAt: now, sections: [], projects: [], secrets: 0 })

const isStringList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

// Lo guardado puede venir de otra versión del sitio: ante cualquier duda, visita nueva
export const parseVisit = (raw: string | null, now: number): VisitState => {
  if (!raw) return newVisit(now)
  try {
    const data = JSON.parse(raw)
    if (
      typeof data?.startedAt === 'number' &&
      Number.isFinite(data.startedAt) &&
      isStringList(data.sections) &&
      isStringList(data.projects) &&
      (data.secrets === 0 || data.secrets === 1)
    ) {
      return { startedAt: data.startedAt, sections: data.sections, projects: data.projects, secrets: data.secrets }
    }
  } catch {
    // JSON inválido
  }
  return newVisit(now)
}

const addOnce = (list: string[], item: string) => (list.includes(item) ? list : [...list, item])

export const markSection = (s: VisitState, id: string): VisitState => ({ ...s, sections: addOnce(s.sections, id) })

export const markProject = (s: VisitState, slug: string): VisitState => ({ ...s, projects: addOnce(s.projects, slug) })

export const markSecret = (s: VisitState): VisitState => ({ ...s, secrets: 1 })

const pad = (n: number) => String(n).padStart(2, '0')

// mm:ss en la primera hora y h:mm:ss después, sin tope
export const formatElapsed = (ms: number): string => {
  const seconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(seconds / 3600)
  const mmss = `${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`
  return hours ? `${hours}:${mmss}` : mmss
}
