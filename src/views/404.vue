<script setup>
import Image from '@/components/ui/image/image.vue'
import Link from '@/components/ui/link/link.vue'
import { pages, images } from '@/config/project/index.js'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-16 h-full m-auto">
    <Link :href="pages.home">
      <Image
        class="max-w-80 block"
        :src="images.logo"
        alt="RGD" />
    </Link>
    <h1 class="flex items-center gap-4 text-[50px]">
      <span class="font-bold border-r pr-10 mr-8">404</span>
      <span class="text-2xl">Страница не найдена</span>
    </h1>
    <Link
      :href="pages.home"
      type="red-outline"
      size="middle">
      На главную
    </Link>
  </div>
</template>
