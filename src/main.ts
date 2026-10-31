import { createApp } from 'vue'
import './style.css'
import 'swiper/swiper-bundle.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Monta con la ruta inicial resuelta para que la primera pintura ya tenga contenido
router.isReady().then(() => {
  app.mount('#app')
})


