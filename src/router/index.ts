import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ProjectDetail from '@/pages/ProjectDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/proyectos/:slug', name: 'ProjectDetail', component: ProjectDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 72 }
    }
    return { top: 0 }
  },
})

export default router
