<template>
  <footer>
    <slot />
  </footer>
</template>

<style lang="scss" scoped>
footer {
  @apply flex items-center justify-between gap-4 text-xs text-white-soft bg-gradient-dark py-4 px-8 rounded-t;
}
</style>
