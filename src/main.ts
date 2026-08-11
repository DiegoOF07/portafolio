import { createApp } from 'vue'
import './style.css'
import 'swiper/swiper-bundle.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Esperar a que la ruta inicial esté resuelta antes de montar,
// para que la primera pintura ya incluya el contenido (evita home vacío).
router.isReady().then(() => {
  app.mount('#app')
})


