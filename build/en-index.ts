// Genera el index.html de /en: las redes leen el HTML sin ejecutar JS, así que la vista previa en inglés necesita su propio archivo
const SITE = 'https://diego-o-flores-portfolio.netlify.app'

export interface EnMeta {
  title: string
  description: string
  imageAlt: string
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Reemplaza exactamente una coincidencia; si index.html cambió y ya no está, que el build falle
const swap = (html: string, pattern: RegExp, value: string) => {
  if (!pattern.test(html)) throw new Error(`en-index: no se encontró ${pattern}`)
  return html.replace(pattern, value)
}

const metaTag = (attr: 'name' | 'property', key: string) => new RegExp(`<meta ${attr}="${key}" content="[^"]*"`)

export const renderEnIndex = (html: string, meta: EnMeta): string => {
  const set = (attr: 'name' | 'property', key: string, value: string) => (h: string) =>
    swap(h, metaTag(attr, key), `<meta ${attr}="${key}" content="${escape(value)}"`)
  const steps = [
    (h: string) => swap(h, /<html lang="es">/, '<html lang="en">'),
    (h: string) => swap(h, /<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`),
    set('name', 'description', meta.description),
    set('property', 'og:title', meta.title),
    set('property', 'og:description', meta.description),
    set('property', 'og:image:alt', meta.imageAlt),
    set('property', 'og:url', `${SITE}/en`),
    set('property', 'og:locale', 'en_US'),
    set('property', 'og:locale:alternate', 'es_GT'),
    set('property', 'og:image', `${SITE}/og-cover-en.png`),
  ]
  return steps.reduce((h, step) => step(h), html)
}
