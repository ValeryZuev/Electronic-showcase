<script setup>
const props = defineProps({
  header: {
    type: Array,
    default: []
  },
  data: {
    type: Object,
    default: {}
  }
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, index) of header"
          :key="index">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) of Object.values(data)"
        :key="row.id">
        <th
          v-for="(column, key) of header"
          :key="key">
          <slot
            :name="`row-${column.id}`"
            v-bind="{ index: index + 1, ...row }"
          >
            {{ row[column.id] }}
          </slot>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  th {
    @apply font-bold;
  }
  th, td {
    @apply min-w-10 px-4 py-4;
  }
  tr {
    @apply border-b-2;
  }
}
</style>
