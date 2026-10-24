import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import ProjectDetail from '@/pages/ProjectDetail.vue'
import { localeOf } from '@/i18n'
import { messages } from '@/i18n/messages'

// Español en la raíz para no romper las URLs ya compartidas
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home-es', component: Home, meta: { locale: 'es', page: 'home' } },
  { path: '/proyectos/:slug', name: 'project-es', component: ProjectDetail, meta: { locale: 'es', page: 'project' } },
  { path: '/en', name: 'home-en', component: Home, meta: { locale: 'en', page: 'home' } },
  { path: '/en/projects/:slug', name: 'project-en', component: ProjectDetail, meta: { locale: 'en', page: 'project' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 72 }
    }
    // Cambio de idioma: conservar el scroll
    if (to.meta.page === from.meta.page && to.params.slug === from.params.slug) return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const locale = localeOf(to)
  document.documentElement.lang = locale
  document.title = messages[locale].meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', messages[locale].meta.description)
})

export default router
