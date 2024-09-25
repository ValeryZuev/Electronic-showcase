<script setup>
import { setBasicUiProps } from '@/compositions/ui/setBasicUiProps.js'

const props = defineProps({
  size: {
    type: String,
    default: 'normal',
  },
})

const { classes } = setBasicUiProps(props, 'pill-badge-component')
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pill-badge-component {
  @apply absolute -top-2.5 -right-2.5 flex items-center justify-center text-white-soft bg-red-base rounded-full;
  &.size {
    &-micro {
      @apply w-2.5 h-2.5;
    }
    &-small {
      @apply w-3 h-3;
    }
    &-normal {
      @apply w-5 h-5;
    }
    &-middle {
      @apply w-6 h-6;
    }
    &-large {
      @apply w-8 h-8 text-xl;
    }
  }
}
</style>
