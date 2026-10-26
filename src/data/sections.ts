// Mismos ids en ambos idiomas: son los anclajes de la home
export const SECTION_IDS = ['inicio', 'sobre-mi', 'proyectos', 'stack', 'experimentos', 'contacto'] as const

export type SectionId = (typeof SECTION_IDS)[number]
