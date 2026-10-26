<script setup lang="ts">
import { useClock } from '@/composables/useClock'
import { useLocale } from '@/i18n'

defineProps<{ layout: 'inline' | 'stacked' }>()

const { m } = useLocale()
const time = useClock()
</script>

<template>
  <p :class="['status', `status--${layout}`]">
    <span>{{ m.status.location }} · <time>{{ time }}</time> ({{ m.status.tz }})</span>
    <span class="available"><span class="dot" aria-hidden="true">●</span> {{ m.status.available }}</span>
  </p>
</template>

<style scoped>
.status {
  display: flex;
  margin: 0;
  font-family: var(--font-pixel);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--text-dim);
}

.status--inline {
  align-items: center;
  gap: 1.25rem;
  white-space: nowrap;
}

.status--stacked {
  flex-direction: column;
  gap: 0.5rem;
}

.available {
  color: var(--text);
}

.dot {
  color: var(--ok);
}
</style>
