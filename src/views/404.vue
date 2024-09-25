<script setup>
import Link from '@/components/ui/link.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-16 h-full">
    <h1 class="flex items-center gap-4 text-[50px] text-light-100">
      <span class="font-bold border-r pr-10 mr-8">404</span>
      <span class="text-2xl">Страница не найдена</span>
    </h1>
    <Link
      href="/home/"
      type="green-rose"
      size="middle">
      На главную
    </Link>
  </div>
</template>
