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
  border-radius: var(--r-badge);
  backdrop-filter: var(--glass-blur-badge);
  -webkit-backdrop-filter: var(--glass-blur-badge);
  background: var(--glass-bg-badge);
  border: var(--glass-border-badge);
  color: var(--ink);
  font-size: 0.85rem;
  font-weight: 500;
  transition: background var(--glass-transition),
    transform var(--glass-transition);
}

.tech-badge:hover {
  background: var(--glass-bg-badge-hover);
  transform: scale(1.05);
}

.tech-badge img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}
</style>
