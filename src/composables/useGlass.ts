export type GlassVariant = 'card' | 'badge' | 'section' | 'default'

export const useGlass = () => {
  const getGlassClass = (variant: GlassVariant = 'default'): string => {
    const classMap: Record<GlassVariant, string> = {
      card: 'glass-card',
      badge: 'glass-badge',
      section: 'glass-section',
      default: 'glass-card',
    }
    return classMap[variant]
  }

  return { getGlassClass }
}