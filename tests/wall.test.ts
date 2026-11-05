import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { TILE, wallPixel, WALLS } from '../src/lib/wall.ts'

const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const root = css.match(/:root\s*{([\s\S]*?)}/)?.[1] ?? ''
const token = (name: string) => {
  const hex = root.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1]
  assert.ok(hex, `falta --${name}`)
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
}

const lum = (rgb: number[]) => {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a: number[], b: number[]) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// Lo que el navegador pinta: el píxel del mosaico, con su alfa por la opacidad de la capa, sobre --bg
const painted = (x: number, y: number, wall: keyof typeof WALLS) => {
  const [r, g, b, a] = wallPixel(x, y, WALLS[wall])
  const alpha = a * WALLS[wall].strength
  return token('bg').map((bg, i) => Math.round(bg + ([r, g, b][i] - bg) * alpha))
}

const bright = (px: number[]) => px[0] + px[1] + px[2]

test('el mosaico se repite cada TILE píxeles sin costura', () => {
  for (let y = 0; y < TILE; y += 4) for (let x = 0; x < TILE; x += 4) {
    assert.deepEqual(wallPixel(x, y, WALLS.metal), wallPixel(x + TILE, y + TILE, WALLS.metal))
  }
})

test('cada placa termina en una junta oscura', () => {
  for (let i = 0; i < TILE; i += 4) {
    assert.ok(bright(wallPixel(0, i, WALLS.metal)) < 40, `junta vertical en y=${i}`)
    assert.ok(bright(wallPixel(i, 0, WALLS.metal)) < 40, `junta horizontal en x=${i}`)
  }
})

test('los remaches de las esquinas brillan más que la placa', () => {
  const plate = bright(wallPixel(20, 20, WALLS.metal))
  for (const [x, y] of [[8, 8], [40, 8], [8, 40], [40, 40]]) {
    assert.ok(bright(wallPixel(x, y, WALLS.metal)) > plate, `remache en ${x},${y}`)
  }
})

test('es determinista', () => {
  assert.deepEqual(wallPixel(20, 12, WALLS.metal), wallPixel(20, 12, WALLS.metal))
})

for (const wall of Object.keys(WALLS) as (keyof typeof WALLS)[]) {
  for (const text of ['text', 'text-dim', 'text-faint']) {
    test(`con el muro ${wall} el --${text} mantiene contraste ≥ 4.5`, () => {
      let worst = Infinity
      for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) worst = Math.min(worst, ratio(token(text), painted(x, y, wall)))
      assert.ok(worst >= 4.5, `contraste ${worst.toFixed(2)}`)
    })
  }
}
