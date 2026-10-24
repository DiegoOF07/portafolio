// El idioma sale de la ruta, no del navegador: cada versión tiene su URL.

import { computed } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded, type RouteLocationRaw } from 'vue-router'
import { messages } from './messages'

export type Locale = 'es' | 'en'

// Ambos idiomas juntos: una traducción faltante no compila.
export type Localized = Record<Locale, string>

declare module 'vue-router' {
  interface RouteMeta {
    locale?: Locale
    page?: 'home' | 'project'
  }
}

export const localeOf = (route: RouteLocationNormalizedLoaded): Locale => route.meta.locale ?? 'es'

export const homeRoute = (locale: Locale, hash?: string): RouteLocationRaw => ({
  name: `home-${locale}`,
  hash: hash ? `#${hash}` : undefined,
})

export const projectRoute = (locale: Locale, slug: string): RouteLocationRaw => ({
  name: `project-${locale}`,
  params: { slug },
})

export const CV_FILES: Record<Locale, string> = {
  es: '/cv-diego-flores.pdf',
  en: '/cv-diego-flores-en.pdf',
}

export const useLocale = () => {
  const route = useRoute()
  const locale = computed(() => localeOf(route))
  const m = computed(() => messages[locale.value])
  const t = (text: Localized) => text[locale.value]

  // Sin hash: el router conserva el scroll (ver scrollBehavior)
  const alternate = computed<RouteLocationRaw>(() => {
    const other: Locale = locale.value === 'es' ? 'en' : 'es'
    if (route.meta.page === 'project') return projectRoute(other, route.params.slug as string)
    return homeRoute(other)
  })

  return { locale, m, t, alternate }
}
