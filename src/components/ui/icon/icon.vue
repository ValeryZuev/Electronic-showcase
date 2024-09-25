<script setup>
import Components from '@/components/ui/icon/icons-components.js'
import { setBasicUiProps } from '@/compositions/ui/setBasicUiProps.js'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'normal',
  },
})

const { classes } = setBasicUiProps(props, 'icon-component')
</script>

<template>
  <div :class="classes">
    <component
      class="block w-full h-full"
      :is="Components[name]" />
  </div>
</template>

<style lang="scss" scoped>
.icon-component {
  @apply shrink-0;
  &.size {
    &-micro {
      @apply w-2.5 h-2.5;
    }
    &-small {
      @apply w-3 h-3;
    }
    &-normal {
      @apply w-4 h-4;
    }
    &-middle {
      @apply w-6 h-6;
    }
    &-large {
      @apply w-8 h-8;
    }
  }
}
</style>
