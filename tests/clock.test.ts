import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatClock } from '../src/lib/clock.ts'

test('formatClock muestra la hora de Guatemala en 24 h', () => {
  assert.equal(formatClock(new Date('2026-10-26T20:32:00Z')), '14:32')
})

test('formatClock cruza la medianoche UTC sin cambiar de día en Guatemala', () => {
  assert.equal(formatClock(new Date('2026-10-27T05:05:00Z')), '23:05')
})
