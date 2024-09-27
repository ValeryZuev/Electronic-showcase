<script setup>
import { setBasicUiProps } from '@/compositions/ui/setBasicUiProps.js'
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
const { classes } = setBasicUiProps(props, 'loader-component')
</script>

<template>
  <div
    v-if="loading"
    :class="classes" />
  <slot v-else />
</template>

<style lang="scss" scoped>
.loader-component {
  @apply relative bg-gradient-dark min-h-[300px] rounded-md overflow-hidden;
  &::before {
    content: '';
    @apply absolute top-0 left-1/2 h-full w-6 bg-white-soft blur-2xl -skew-x-12;
    animation: 3s infinite running;
  }
}

@keyframes running {
  from {
    @apply -left-1/4;
  }
  to {
    @apply left-full;
  }
}
</style>
