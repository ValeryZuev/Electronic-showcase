<script setup>
import Icon from '@/components/ui/icon/icon.vue'
import { setBasicUiProps } from '@/compositions/ui/setBasicUiProps.js'

const props = defineProps({
  error: {
    type: String,
    default: ''
  }
})

const { classes } = setBasicUiProps(props, 'form-item-component')
</script>

<template>
  <div class="flex flex-col w-full">
    <slot />
    <div v-if="error" class="text-xs mt-1">
      {{ error }}
    </div>
  </div>
</template>
