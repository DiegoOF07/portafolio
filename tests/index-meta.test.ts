import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { messages } from '../src/i18n/messages.ts'

// index.html repite a mano los textos en español que leen las redes: tienen que coincidir con messages.ts
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const meta = (attr: string, key: string) => html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1]

test('index.html y messages.es.meta dicen lo mismo', () => {
  const { title, description, imageAlt } = messages.es.meta
  assert.equal(html.match(/<title>([^<]*)<\/title>/)?.[1], title)
  assert.equal(meta('name', 'description'), description)
  assert.equal(meta('property', 'og:title'), title)
  assert.equal(meta('property', 'og:description'), description)
  assert.equal(meta('property', 'og:image:alt'), imageAlt)
})

test('las descripciones caben antes del corte de Google (~155 caracteres)', () => {
  for (const lang of ['es', 'en'] as const) assert.ok(messages[lang].meta.description.length <= 155, lang)
})
