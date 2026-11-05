import { test } from 'node:test'
import assert from 'node:assert/strict'
import { splitMetric, metricAt } from '../src/lib/metric.ts'

test('splitMetric separa prefijo, número y sufijo', () => {
  assert.deepEqual(splitMetric('~100k'), { prefix: '~', target: 100, decimals: 0, suffix: 'k' })
  assert.deepEqual(splitMetric('~2.4 s'), { prefix: '~', target: 2.4, decimals: 1, suffix: ' s' })
  assert.deepEqual(splitMetric('<10 MB'), { prefix: '<', target: 10, decimals: 0, suffix: ' MB' })
  assert.deepEqual(splitMetric('5'), { prefix: '', target: 5, decimals: 0, suffix: '' })
  assert.deepEqual(splitMetric('4/6'), { prefix: '', target: 4, decimals: 0, suffix: '/6' })
})

test('splitMetric devuelve null si no hay número', () => {
  assert.equal(splitMetric('Scrum'), null)
})

test('metricAt termina exactamente en el texto original', () => {
  for (const v of ['~100k', '~2.4 s', '<10 MB', '5', '4/6', '~1 año']) {
    assert.equal(metricAt(splitMetric(v)!, 1), v)
  }
})

test('metricAt arranca en cero con los mismos decimales', () => {
  assert.equal(metricAt(splitMetric('~2.4 s')!, 0), '~0.0 s')
})

test('metricAt a la mitad queda estrictamente entre cero y el valor', () => {
  const mid = metricAt(splitMetric('~100k')!, 0.5)
  const n = Number(mid.slice(1, -1))
  assert.ok(n > 50 && n < 100, `valor intermedio ${mid}`)
})
