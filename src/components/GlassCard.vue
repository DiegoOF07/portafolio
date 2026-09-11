<script setup lang="ts">
import { computed } from 'vue'
import { useGlass } from '@/composables/useGlass'

type CardVariant = 'project' | 'skill' | 'section' | 'default'

interface Props {
  variant?: CardVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const { getGlassClass } = useGlass()

const glassVariantMap: Record<CardVariant, 'card' | 'badge' | 'section'> = {
  project: 'card',
  skill: 'badge',
  section: 'section',
  default: 'card',
}

const classes = computed(() => getGlassClass(glassVariantMap[props.variant]))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>