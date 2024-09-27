<script setup>
import { setBasicUiDataBindings } from '@/compositions/ui/setBasicUiDataBindings.js'
import { setBasicUiProps } from '@/compositions/ui/setBasicUiProps.js'

import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  nativeType: {
    type: String,
    default: 'text',
  },
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'normal',
  },
  placeholder: {
    type: String,
    default: 'Type here...',
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])
const { change } = setBasicUiDataBindings(emit)
const { classes } = setBasicUiProps(props, 'input-component')
</script>

<template>
  <input
    :type="nativeType"
    :value="modelValue"
    class="w-full h-full"
    :class="classes"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    @change="change"
    @input="change" />
</template>

<style lang="scss" scoped>
.input-component {
  @apply text-black-soft px-4 py-2 rounded-sm focus:outline-none;
  &::placeholder {
    @apply text-black-soft/80;
  }
  &.type {
    &-primary {
     @apply bg-white-soft;
    }
  }
}
</style>
