<script setup>
import Button from '@/components/ui/button/button.vue'
import Input from '@/components/ui/input/input.vue'
import RangeInput from '@/components/ui-extend/range-input/range-input.vue'
import Select from '@/components/ui/select/select.vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['onApplyFilters', 'onResetFilters'])

const components = {
  input: Input,
  'range': RangeInput,
  select: Select,
}

const getComponentProps = (filter) => {
  switch (filter.type) {
    case 'range':
      return { min: filter.min, max: filter.max };
    case 'select':
      return { options: Object.values(filter.options) };
    default:
      return {};
  }
};
</script>

<template>
  <aside>
    <div
      v-for="(filter, key) in filters"
      :key="key"
      class="flex flex-col gap-2">
      {{ filter.label }}
      <component
        v-model="filter.value"
        v-bind="getComponentProps(filter)"
        :is="components[filter.type]"
        :name="key"
        :id="key"
      />
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <Button
        type="red"
        @click="emit('onApplyFilters')">
        Применить
      </Button>
      <Button
        type="red-outline"
        @click="emit('onResetFilters')">
        Сбросить
      </Button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  @apply flex flex-col gap-4 bg-gradient-dark pt-4 pb-8 px-8 rounded-sm
  focus:outline-none;
}
</style>
