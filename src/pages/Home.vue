<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import vueLogo from '@/assets/logos/vue.svg'
import tsLogo from '@/assets/logos/typescript.svg'
import viteLogo from '@/assets/logos/vite.svg'
import jsLogo from '@/assets/logos/javascript.svg'
import reactLogo from '@/assets/logos/react.svg'
import goLogo from '@/assets/logos/go.svg'
import postgresLogo from '@/assets/logos/postgresql.svg'
import pythonLogo from '@/assets/logos/python.svg'
import cplusLogo from '@/assets/logos/cplusplus.svg'
import javaLogo from '@/assets/logos/java.svg'
import dockerLogo from '@/assets/logos/docker.svg'

const technologies = [
  { name: 'Vue 3', logo: vueLogo },
  { name: 'TypeScript', logo: tsLogo },
  { name: 'Vite', logo: viteLogo },
  { name: 'Javascript', logo: jsLogo },
  { name: 'React', logo: reactLogo },
  { name: 'Go', logo: goLogo },
  { name: 'PostgreSQL', logo: postgresLogo },
  { name: 'Python', logo: pythonLogo },
  { name: 'C++', logo: cplusLogo },
  { name: 'Java', logo: javaLogo },
  { name: 'Docker', logo: dockerLogo },
]
</script>

<template>
  <section class="home">
    <div class="hero">

      <div class="hero-glass-card">
        <h1>Soy <span class="highlight">Diego Flores</span></h1>
        <h2>Desarrollador <span class="highlight2">Frontend</span> & <span class="highlight2">Backend</span></h2>
        <p class="description">
          Desarrollo aplicaciones completas usando
          <span class="highlight3">Vue</span>,
          <span class="highlight3">React</span>,
          <span class="highlight3">Go</span> y
          <span class="highlight3">PostgreSQL</span>.
          Enfocado en rendimiento, escalabilidad y buena UX.
        </p>

        <div class="hero-stats">
          <div class="stat">
            <div class="number">8+</div>
            <div class="label">Proyectos</div>
          </div>
          <div class="stat">
            <div class="number">3+</div>
            <div class="label">Años Experiencia</div>
          </div>
          <div class="stat">
            <div class="number">100%</div>
            <div class="label">Fiable</div>
          </div>
        </div>

        <div class="hero-actions">
          <RouterLink to="/projects" class="btn-hero-primary">Ver proyectos</RouterLink>
          <RouterLink to="/contact" class="btn-hero-secondary">Contáctame</RouterLink>
        </div>
      </div>

      <img src="../assets/Developer activity-bro.svg" alt="Developer" class="hero-img" />
    </div>

    <div class="carousel">
      <h3>Tecnologías que uso</h3>
      <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="2" :space-between="20" :loop="true"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :breakpoints="{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 5 } }" class="tech-swiper">
        <SwiperSlide v-for="tech in technologies" :key="tech.name" class="slide">
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
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero */
.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.hero-glass-card {
  flex: 1 1 400px;
  backdrop-filter: blur(12px);
  background: var(--hero-glass-bg);
  border: var(--hero-glass-border);
  border-radius: 2rem;
  padding: 2.5rem;
  box-shadow: var(--hero-glass-shadow);
}

.hero-img {
  max-width: 400px;
  width: 100%;
  flex-shrink: 0;
}

.hero-glass-card h1 {
  font-size: 2.5rem;
  margin: 0;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
}

.hero-glass-card h2 {
  font-size: 1.5rem;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.hero-glass-card p {
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

/* Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat {
  text-align: center;
}

.stat .number {
  font-size: 1.75rem;
  color: var(--color-accent);
  font-weight: bold;
}

.stat .label {
  color: var(--color-text-primary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Botones hero */
.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn-hero-primary,
.btn-hero-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(8px);
  background: var(--btn-glass-bg);
  border: var(--btn-glass-border);
}

.btn-hero-primary {
  color: white;
}

.btn-hero-primary:hover {
  background: var(--hover-primary);
  transform: translateY(-2px);
  box-shadow: var(--btn-glass-shadow);
}

.btn-hero-secondary {
  color: var(--color-text-primary);
}

.btn-hero-secondary:hover {
  background: var(--color-gradient-5);
  transform: translateY(-2px);
  box-shadow: var(--btn-glass-shadow);
}

/* Highlights */
.highlight {
  color: var(--color-accent);
}

.highlight2 {
  color: var(--color-accent-purple);
}

.highlight2:hover {
  cursor: pointer;
}

.highlight3 {
  color: var(--color-accent-purple);
}

/* Carrusel */
.carousel {
  backdrop-filter: blur(8px);
  background: var(--carousel-glass-bg);
  border: var(--carousel-glass-border);
  border-radius: 2rem;
  padding: 1.5rem;
  text-align: center;
}

.carousel h3 {
  font-size: 1.75rem;
  margin: 0;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.tech-swiper {
  padding: 6px 0;
}

.slide-content {
  background: var(--glass-bg-badge);
  border: var(--glass-border-badge);
  backdrop-filter: var(--glass-blur-badge);
  -webkit-backdrop-filter: var(--glass-blur-badge);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.slide-content:hover {
  background: var(--slide-glass-hover-bg);
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
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

/* Responsive */
@media (max-width: 895px) {
  .hero {
    justify-content: center;
  }

  .hero-glass-card {
    text-align: center;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .hero-actions {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
}
</style>