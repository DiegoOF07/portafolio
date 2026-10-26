export interface MetricParts {
  prefix: string
  target: number
  decimals: number
  suffix: string
}

// Solo el primer número cuenta: "~2.4 s" → "~" · 2.4 · " s"
export const splitMetric = (value: string): MetricParts | null => {
  const match = value.match(/-?\d+(?:\.\d+)?/)
  if (!match || match.index === undefined) return null
  const number = match[0]
  return {
    prefix: value.slice(0, match.index),
    target: Number(number),
    decimals: number.split('.')[1]?.length ?? 0,
    suffix: value.slice(match.index + number.length),
  }
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

export const metricAt = (parts: MetricParts, progress: number): string => {
  const p = Math.min(Math.max(progress, 0), 1)
  const value = parts.target * easeOutCubic(p)
  return `${parts.prefix}${value.toFixed(parts.decimals)}${parts.suffix}`
}
