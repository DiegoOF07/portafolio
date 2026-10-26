<script setup lang="ts">
import { useClock } from '@/composables/useClock'
import { useLocale } from '@/i18n'

const { m } = useLocale()
const time = useClock()
</script>

<template>
  <p class="status">
    <span>{{ m.status.location }} · <time>{{ time }}</time> ({{ m.status.tz }})</span>
    <span class="available"><span class="dot" aria-hidden="true">●</span> {{ m.status.available }}</span>
  </p>
</template>

<style scoped>
.status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 1.25rem;
  row-gap: 0.25rem;
  margin: 0;
  font-family: var(--font-pixel);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--text-dim);
}

.available {
  color: var(--text);
}

.dot {
  color: var(--ok);
}
</style>
