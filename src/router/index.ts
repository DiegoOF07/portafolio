import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import Contact from '../pages/Contact.vue'
import Skills from '../pages/Skills.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/skills', name: 'Skills', component: Skills}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
