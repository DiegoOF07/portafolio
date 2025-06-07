<script setup lang="ts">
defineProps<{
  name: string
  icon?: string
}>()
</script>

<template>
  <div class="tech-badge">
    <img v-if="icon" :src="icon" :alt="name" />
    <span>{{ name }}</span>
  </div>
</template>

<style scoped>
.tech-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-text-primary);
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;
}

.tech-badge:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.tech-badge img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}
</style>
