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
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 400;
}

.tech-badge img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}
</style>
