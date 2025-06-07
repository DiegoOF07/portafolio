<script setup lang="ts">
import { Mail, Github, Linkedin, MapPin } from "lucide-vue-next";
</script>

<template>
  <section class="contact-card">
    <div class="glass-box">
      <div class="profile">
        <img src="@/assets/img/profile.jpg" alt="Diego Flores" class="avatar" />
        <div class="text">
          <h2>Diego Oswaldo Flores Rivas</h2>
          <p class="description">
            Soy un desarrollador apasionado por la tecnología y el diseño de
            experiencias digitales. Me encanta construir aplicaciones web
            modernas, funcionales y visualmente atractivas.
          </p>
        </div>
      </div>

      <ul class="info-list">
        <li>
          <Mail class="icon" />
          <span
            ><a href="mailto:floresdiego041@gmail.com"
              >floresdiego041@gmail.com</a
            ></span
          >
        </li>
        <li>
          <Github class="icon" />
          <span
            ><a href="https://github.com/DiegoOF07" target="_blank"
              >github.com/DiegoOF07</a
            ></span
          >
        </li>
        <li>
          <Linkedin class="icon" />
          <span
            ><a href="https://linkedin.com/in/diego-flores-gt" target="_blank"
              >linkedin.com/in/diego-flores-gt</a
            ></span
          >
        </li>
        <li>
          <MapPin class="icon" />
          <span>Guatemala</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contact-card {
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  background: var(--color-background);
}

.glass-box {
  background: rgba(49, 54, 63, 0.5);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  max-width: 700px;
  width: 100%;
  color: var(--color-text-primary);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.avatar {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.text {
  flex: 1;
}

.text h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--color-accent);
}

.description {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.info-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
}

.icon {
  color: var(--color-primary);
  width: 20px;
  height: 20px;
}

a {
  color: var(--color-text-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
}

a:hover {
  color: var(--color-accent);
  border-bottom: 1px solid var(--color-accent);
}
</style>
