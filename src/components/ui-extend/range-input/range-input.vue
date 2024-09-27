<script setup>
import Input from '@/components/ui/input/input.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ from: 0, to: 0 })
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 9999
  }
})
const emit = defineEmits(['update:modelValue'])

const update = () => {
  emit('update:modelValue', { ...props.modelValue })
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Input
      v-model="modelValue.from"
      native-type="number"
      :placeholder="'От ' + min"
      :min="min"
      :max="max"
      @update:model-value="update"
    />
    <Input
      v-model="modelValue.to"
      native-type="number"
      :placeholder="'До ' + max"
      :min="min"
      :max="max"
      @update:model-value="update"
    />
  </div>
</template>
