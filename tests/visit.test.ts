import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newVisit, parseVisit, markSection, markProject, markSecret, formatElapsed } from '../src/lib/visit.ts'

test('parseVisit arranca de cero sin datos o con basura', () => {
  assert.deepEqual(parseVisit(null, 1000), newVisit(1000))
  assert.deepEqual(parseVisit('{basura', 1000), newVisit(1000))
  assert.deepEqual(parseVisit('{"startedAt":"x"}', 1000), newVisit(1000))
  assert.deepEqual(parseVisit('{"startedAt":5,"sections":[1],"projects":[],"secrets":0}', 1000), newVisit(1000))
})

test('parseVisit conserva una visita válida', () => {
  const s = markProject(markSection(newVisit(500), 'stack'), 'diskflow')
  assert.deepEqual(parseVisit(JSON.stringify(s), 9999), s)
})

test('markProject y markSection no duplican', () => {
  const s = markProject(markProject(newVisit(0), 'diskflow'), 'diskflow')
  assert.equal(s.projects.length, 1)
  const t = markSection(markSection(newVisit(0), 'stack'), 'stack')
  assert.equal(t.sections.length, 1)
})

test('markSecret cuenta una sola vez', () => {
  assert.equal(markSecret(markSecret(newVisit(0))).secrets, 1)
})

test('las funciones no mutan su entrada', () => {
  const s = newVisit(0)
  const copy = structuredClone(s)
  markSection(s, 'stack')
  markProject(s, 'diskflow')
  markSecret(s)
  assert.deepEqual(s, copy)
})

test('formatElapsed da mm:ss en la primera hora', () => {
  assert.equal(formatElapsed(102_000), '01:42')
  assert.equal(formatElapsed(0), '00:00')
  assert.equal(formatElapsed(3599_000), '59:59')
  assert.equal(formatElapsed(-5), '00:00')
})

// Un tope fijo como 99:59 deja de avanzar y parece un dato inventado
test('formatElapsed pasa a h:mm:ss después de una hora y sigue avanzando', () => {
  assert.equal(formatElapsed(3600_000), '1:00:00')
  assert.equal(formatElapsed(10 * 3600_000 + 65_000), '10:01:05')
})
