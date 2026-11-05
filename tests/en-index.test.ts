import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderEnIndex } from '../build/en-index.ts'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const en = renderEnIndex(html, { title: 'T', description: 'D', imageAlt: 'A' })
const meta = (attr: string, key: string) => en.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1]

test('el documento queda en inglés con el título y la descripción dados', () => {
  assert.match(en, /<html lang="en">/)
  assert.match(en, /<title>T<\/title>/)
  assert.equal(meta('name', 'description'), 'D')
  assert.equal(meta('property', 'og:title'), 'T')
  assert.equal(meta('property', 'og:description'), 'D')
  assert.equal(meta('property', 'og:image:alt'), 'A')
})

test('la vista previa apunta a /en, en_US y la portada en inglés', () => {
  assert.equal(meta('property', 'og:url'), 'https://diego-o-flores-portfolio.netlify.app/en')
  assert.equal(meta('property', 'og:locale'), 'en_US')
  assert.equal(meta('property', 'og:locale:alternate'), 'es_GT')
  assert.equal(meta('property', 'og:image'), 'https://diego-o-flores-portfolio.netlify.app/og-cover-en.png')
})

test('falla en voz alta si index.html cambia y una etiqueta ya no se encuentra', () => {
  assert.throws(() => renderEnIndex('<html lang="es"><head></head></html>', { title: 'T', description: 'D', imageAlt: 'A' }))
})
