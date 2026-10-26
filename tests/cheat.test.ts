import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createCheatDetector } from '../src/lib/cheat.ts'

const feed = (keys: string[]) => {
  const d = createCheatDetector()
  return keys.map((k) => d(k))
}

test('se activa solo con la última tecla de IDDQD', () => {
  assert.deepEqual(feed(['i', 'd', 'd', 'q', 'd']), [false, false, false, false, true])
})

test('no distingue mayúsculas', () => {
  assert.equal(feed(['I', 'D', 'D', 'Q', 'D']).at(-1), true)
})

test('una tecla equivocada en medio rompe la secuencia', () => {
  assert.ok(!feed(['i', 'd', 'x', 'd', 'q', 'd']).includes(true))
})

test('encuentra el código aunque empiece a medias', () => {
  assert.equal(feed(['i', 'd', 'd', 'i', 'd', 'd', 'q', 'd']).at(-1), true)
})

test('las teclas con nombre largo se ignoran sin reiniciar', () => {
  assert.equal(feed(['i', 'Shift', 'd', 'd', 'Enter', 'q', 'd']).at(-1), true)
})
