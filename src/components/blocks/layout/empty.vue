<template>
  <section class="w-full m-auto">
    <template v-if="$slots.default">
      <slot name="default" />
    </template>
    <template v-else>
      <div class="text-2xl text-center">По вашему запросу ничего не найдено</div>
    </template>
  </section>
</template>
