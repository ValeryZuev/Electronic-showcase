<script setup>
import vOutside from '@/directives/outside.js'
import Icon from '@/components/ui/icon/icon.vue'

import { computed, ref } from 'vue'
import { setBasicUiDataBindings } from '@/compositions/ui/setBasicUiDataBindings.js'
import { setBasicUiProps } from '@/compositions/ui/setBasicUiProps.js'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
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
    default: 'Choose option',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  hideSelected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'change'])

const { classes } = setBasicUiProps(props, 'select-component')
const { change } = setBasicUiDataBindings(emit)

const isValueAnArray = Array.isArray(props.modelValue)
if (isValueAnArray || [null, 'undefined'].includes(props.modelValue)) {
  change('')
}

const isOpen = ref(false)

const isOptionFlat = computed(() => typeof props.options[0] !== 'object')
const currentValue = computed(() => {
  const { modelValue, options, valueKey } = props
  if (isOptionFlat.value) {
    return options.find((a) => a === modelValue)
  }
  if (!modelValue) {
    return {}
  }

  return options.find((a) => a[valueKey] === modelValue)
})
const isSomethingSelected = computed(
  () =>
    ![null, 'undefined'].includes(props.modelValue) &&
    !Array.isArray(props.modelValue) &&
    props.options.some((a) =>
      isOptionFlat.value
        ? a === props.modelValue
        : a[props.valueKey] === props.modelValue
    )
)
const close = () => {
  isOpen.value = false
}
const open = () => {
  isOpen.value = true
}
const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}
const choose = (index) => {
  const value = isOptionFlat.value
    ? props.options[index]
    : props.options[index][props.valueKey]

  change(value)
  close()
}
</script>

<template>
  <div
    v-outside="close"
    :class="[{ 'z-10': isOpen }, classes]">
    <div
      class="select-component-label group"
      :class="[isOpen ? 'rounded-t-sm' : 'rounded-sm']"
      tabindex="-1"
      @click="toggle">
      <template v-if="!isSomethingSelected">
        {{ placeholder }}
      </template>
      <template v-else>
        <template v-if="!$slots.default">
          <span class="whitespace-nowrap text-ellipsis overflow-hidden">
            {{ isOptionFlat ? currentValue : currentValue[labelKey] }}
          </span>
        </template>
        <slot
          v-else
          name="default"
          v-bind="currentValue" />
      </template>
      <Icon
        class="ml-auto group-hover:translate-y-0.5 xl:transition-all"
        :class="{ 'rotate-180': isOpen }"
        name="chevron-down"
        size="small" />
    </div>
    <div
      v-if="isOpen"
      class="select-component-options">
      <div
        v-for="(item, index) in props.options"
        :key="isOptionFlat ? item : item[valueKey]"
        :class="{
          choose: item === currentValue,
          hidden: hideSelected && item[valueKey] === currentValue[valueKey],
        }"
        @click="choose(index)">
        <slot
          v-if="$slots.option"
          name="option"
          v-bind="isOptionFlat ? { label: item } : item" />
        <template v-else>
          {{ isOptionFlat ? item : item[labelKey] }}
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-component {
  @apply relative text-black-soft;
  &-label {
    @apply flex items-center gap-2 h-full px-4 py-2 cursor-pointer;
  }
  &-options {
    @apply absolute top-full left-0 min-w-full py-1 rounded-b-sm;
    & > * {
      @apply flex items-center gap-2 h-full px-4 py-2 cursor-pointer xl:transition-all;
      &:hover {
        @apply hover:backdrop-brightness-95;
      }
    }
  }
  &.type {
    &-primary {
      .select-component-label,
      .select-component-options {
        @apply bg-white-soft;
      }
    }
  }
}
</style>
