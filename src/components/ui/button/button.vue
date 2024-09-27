<script setup>
import { setBasicUiProps } from '@/compositions/ui/setBasicUiProps.js'

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'normal'
  },
  nativeType: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const { classes } = setBasicUiProps(props, 'button-component')
</script>

<template>
  <button
      :class= "classes"
      :disabled="disabled"
      :type="nativeType"
      @click="emit('click')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button-component {
  @apply flex items-center justify-center shrink-0 rounded-sm transition;
  &.type {
    &-primary {
      @apply bg-white-soft;
    }
    &-red {
      @apply bg-red-base;
    }
    &-red-outline {
      @apply bg-transparent border-2 border-red-base;
    }
  }
  &.size {
    &-micro {
      @apply text-xs px-2 py-1;
    }
    &-small {
      @apply text-xs px-4 py-2;
    }
    &-normal {
      @apply text-sm px-8 py-2;
    }
    &-middle {
      @apply text-base px-10 py-3
    }
    &-large {
      @apply text-sm px-10 py-2
      sm:text-lg sm:px-16 sm:py-4;
    }
  }
}
</style>
