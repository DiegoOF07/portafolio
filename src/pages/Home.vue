<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules'
import vueLogo from '@/assets/logos/vue.svg'
import tsLogo from '@/assets/logos/typescript.svg'
import viteLogo from '@/assets/logos/vite.svg'
import nodeLogo from '@/assets/logos/nodejs.svg'
import reactLogo from '@/assets/logos/react.svg'
import goLogo from '@/assets/logos/go.svg'
import kotlinLogo from '@/assets/logos/kotlin.svg'
import postgresLogo from '@/assets/logos/postgresql.svg'
import pythonLogo from '@/assets/logos/python.svg'
import 'swiper/css';

const technologies = [
  { name: 'Vue 3', logo: vueLogo },
  { name: 'TypeScript', logo: tsLogo },
  { name: 'Vite', logo: viteLogo },
  { name: 'Node.js', logo: nodeLogo },
  { name: 'React', logo: reactLogo },
  { name: 'Go', logo: goLogo },
  { name: 'Kotlin', logo: kotlinLogo },
  { name: 'PostgreSQL', logo: postgresLogo },
  { name: 'Python', logo: pythonLogo },
];
</script>

<template>
  <section class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Hola, soy <span class="highlight">Diego</span></h1>
        <h2>Desarrollador <span class="highlight2">Frontend</span> | <span class="highlight2">Backend</span> | <span class="highlight2">Mobile</span></h2>
        <p>Me gusta la tecnología y ofrecer soluciones a partir de ella</p>
        <div class="hero-actions">
          <RouterLink to="/projects" class="btn-primary">Ver proyectos</RouterLink>
          <RouterLink to="/contact" class="btn-secondary">Contáctame</RouterLink>
        </div>
      </div>
      <img src="../assets/Developer activity-bro.svg" alt="Developer" class="hero-img" />
    </div>

    <div class="carousel">
      <h3>Tecnologías que uso</h3>
      <Swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="2"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :breakpoints="{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 5 } }"
        class="tech-swiper"
      >
        <SwiperSlide
          v-for="tech in technologies"
          :key="tech.name"
          class="slide"
        >
          <div class="slide-content">
            <img :src="tech.logo" :alt="tech.name" class="tech-logo" />
            <p>{{ tech.name }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
.home {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.hero-content {
  flex: 1 1 400px;
}

.hero-img {
  max-width: 400px;
  width: 100%;
  flex-shrink: 0;
}

.hero h1 {
  font-size: 2.5rem;
  color: var(--color-text-primary);
}

.hero h2 {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.hero p {
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-primary {
  background-color: var(--color-accent);
  color: white;
}

.btn-primary:hover {
  background-color: var(--hover-accent);
}

.btn-secondary {
  border: 2px solid var(--color-accent);
  color: var(--color-accent);
}

.btn-secondary:hover {
  background-color: var(--color-accent);
  color: white;
}

.highlight {
  color: var(--color-accent);
}

.highlight2{
  color: var(--color-text-primary);
  background: var(--color-primary);
  padding: 0.5rem;
  border-radius: 8px;
}

.carousel {
  padding: 2rem 0;
  text-align: center;
}

.carousel h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.tech-swiper {
  padding: 6px 0;
}

.slide-content {
  background: var(--color-secondary);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.slide-content:hover {
  transform: translateY(-6px);
}

.tech-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.slide p {
  color: var(--color-text-primary);
  font-weight: 600;
}


@media (max-width: 895px) {
    .hero, .hero-actions{
        justify-content: center;
    }

    .hero-content{
        text-align: center;
    }


}

</style>

