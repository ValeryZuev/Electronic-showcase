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
  href: {
    type: String,
    default: ''
  },
  activeClass: {
    type: String,
    default: ''
  },
})

const { classes } = setBasicUiProps(props, 'link-component')
const isExternal =
  props.href.startsWith('http') ||
  props.href.trim().startsWith('mailto') ||
  props.href.trim().startsWith('tel')
</script>

<template>
  <a
    v-if="isExternal"
    :class="classes"
    :href="href"
    :target="isExternal ? '_blank' : null">
    <slot />
  </a>
  <RouterLink
    v-else
    :class="classes"
    :active-class="activeClass"
    :to="{ path: href }">
    <slot />
  </RouterLink>
</template>

<style lang="scss" scoped>
.link-component {
  @apply font-medium text-center xl:transition-all;
  &.type {
    &-primary {
      @apply text-green-base hover:opacity-50;
    }
    &-green-rose {
      @apply relative rounded overflow-hidden hover:opacity-50
        bg-gradient-green-rose text-transparent bg-clip-text;
      &::after {
        content: '';
        @apply absolute top-0 left-0 block w-full h-full
        border-2 border-solid border-image-green-rose border-image-1;
      }
    }
  }
  &.size {
    &-micro {
      @apply text-xs;
    }
    &-small {
      @apply text-sm;
    }
    &-middle {
      @apply text-base px-10 py-3
    }
    &-large {
      @apply text-sm px-2 py-2
      sm:text-lg sm:px-16 sm:py-4;
    }
  }
}
</style>
