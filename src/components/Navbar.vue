<script setup>
import { Home, Pen, Phone, Notebook, PersonStanding } from 'lucide-vue-next';
</script>

<template>
  <nav class="navbar">
    <div class="logo">MyPortfolio</div>
    <ul class="nav-links">
      <li><RouterLink to="/" exact-active-class="active" class="nav-link"><Home /><span>Principal</span></RouterLink></li>
      <li><RouterLink to="/about" exact-active-class="active" class="nav-link"><PersonStanding /><span>Sobre mi</span></RouterLink></li>
      <li><RouterLink to="/projects" exact-active-class="active" class="nav-link"><Notebook /><span>Proyectos</span></RouterLink></li>
      <li><RouterLink to="/contact" exact-active-class="active" class="nav-link"><Phone /><span>Contacto</span></RouterLink></li>
      <li><RouterLink to="/skills" exact-active-class="active" class="nav-link"><Pen /><span>Habilidades</span></RouterLink></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--hover-background);
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--color-primary);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #bbb;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background 0.2s;
}

.active {
  color: var(--hover-primary);
  background: var(--color-background);
}
</style>
