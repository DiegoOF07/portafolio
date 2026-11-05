import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// Lee los tokens de color del primer :root de style.css
const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const root = css.match(/:root\s*{([\s\S]*?)}/)?.[1] ?? ''
const token = (name: string): string => {
  const hex = root.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1]
  assert.ok(hex, `falta el token --${name} en :root`)
  return hex
}

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const pairs: [fg: string, bg: string, min: number][] = [
  ['text', 'bg', 4.5],
  ['text-dim', 'bg', 4.5],
  ['text-faint', 'bg', 4.5],
  ['label', 'bg', 4.5],
  ['act-ink', 'act', 4.5],
  ['act', 'bg', 3],
  ['ink', 'surface', 4.5],
]

for (const [fg, bg, min] of pairs) {
  test(`--${fg} sobre --${bg} tiene contraste ≥ ${min}`, () => {
    const r = ratio(token(fg), token(bg))
    assert.ok(r >= min, `contraste ${r.toFixed(2)} < ${min}`)
  })
}
