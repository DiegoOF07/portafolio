<script setup lang="ts">
import { useLocale } from '@/i18n'
import { useVisitProgress } from '@/composables/useVisitProgress'

const { m } = useLocale()
const { justUnlocked } = useVisitProgress()
</script>

<template>
  <!-- El contenedor vive siempre: un role="status" que aparece de golpe no siempre se anuncia -->
  <div class="secret-toast-region" role="status" aria-live="polite">
    <aside v-if="justUnlocked" class="secret-toast">
      <p class="title">{{ m.secret.title }}</p>
      <p class="note">{{ m.secret.note }}</p>
      <button type="button" class="close" @click="justUnlocked = false">{{ m.secret.close }}</button>
    </aside>
  </div>
</template>

<style scoped>
.secret-toast-region {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 60;
}

.secret-toast {
  width: min(22rem, calc(100vw - 2rem));
  padding: var(--s-4);
  border: 1px solid var(--label);
  border-radius: var(--r-surface);
  background: var(--surface);
  color: var(--text);
}

.title {
  margin: 0 0 var(--s-2);
  font-family: var(--font-pixel);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--label);
}

.note {
  margin: 0 0 var(--s-3);
  font-size: var(--step--1);
}

.close {
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: var(--r-control);
  background: none;
  color: var(--ink);
  font-family: var(--font-mono);
  font-weight: 600;
  cursor: pointer;
}

.close:hover {
  background: var(--bg);
}

/* Teléfono: franja baja a todo el ancho y el botón al lado del título, para tapar lo menos posible */
@media (max-width: 599px) {
  .secret-toast-region {
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
  }

  .secret-toast {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: var(--s-3);
    width: auto;
    padding: var(--s-2) var(--s-3);
  }

  .title {
    margin: 0;
  }

  .note {
    grid-column: 1 / -1;
    grid-row: 2;
    margin: var(--s-1) 0 0;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .close {
    grid-column: 2;
    grid-row: 1;
    padding: 2px 8px;
    font-size: 0.8rem;
  }
}

.close:focus-visible {
  outline: 2px solid var(--label);
  outline-offset: 2px;
}
</style>
