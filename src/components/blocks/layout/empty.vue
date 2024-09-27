<template>
  <section class="w-full m-auto">
    <template v-if="$slots.default">
      <slot name="default" />
    </template>
    <template v-else>
      <h2 class="text-center">По вашему запросу ничего не найдено</h2>
    </template>
  </section>
</template>
