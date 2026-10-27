// Mosaico de pared de metal al estilo Doom: placas de 48 px en bloques de 4 px, con junta, bisel y remaches
export const TILE = 48
export const BLOCK = 4

export interface Wall {
  base: [number, number, number]
  spread: [number, number, number]
  // Opacidad de la capa: el máximo que deja --text-faint en 4.5:1 sobre la pared (ver tests/wall.test.ts)
  strength: number
}

export const WALLS = {
  metal: { base: [74, 68, 62], spread: [22, 18, 14], strength: 0.27 },
  gold: { base: [140, 104, 34], spread: [36, 28, 16], strength: 0.16 },
} satisfies Record<string, Wall>

const RIVETS = [8, 40]
const RIVET = 1.6

// Color [r, g, b, alfa] del bloque que contiene (x, y)
export const wallPixel = (x: number, y: number, wall: Wall): [number, number, number, number] => {
  const snap = (v: number) => {
    const m = ((v % TILE) + TILE) % TILE
    return m - (m % BLOCK)
  }
  const bx = snap(x)
  const by = snap(y)
  if (bx === 0 || by === 0) return [8, 7, 6, 0.9]

  const shade = (k: number): [number, number, number, number] => {
    const noise = ((bx * 7 + by * 13) % 17) / 17
    const [r, g, b] = wall.base.map((c, i) => Math.min(255, Math.round((c + noise * wall.spread[i]) * k)))
    return [r, g, b, 0.55]
  }
  if (RIVETS.includes(bx) && RIVETS.includes(by)) return shade(RIVET)
  // La sombra del remache cae abajo a la derecha
  if (RIVETS.includes(bx - BLOCK) && RIVETS.includes(by - BLOCK)) return shade(0.45)
  // Bisel: la luz viene de arriba a la izquierda
  if (bx === BLOCK || by === BLOCK) return shade(1.3)
  if (bx === TILE - BLOCK || by === TILE - BLOCK) return shade(0.6)
  return shade(1)
}
