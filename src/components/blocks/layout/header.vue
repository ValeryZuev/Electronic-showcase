<script setup>
import Icon from '@/components/ui/icon/icon.vue'
import Image from '@/components/ui/image/image.vue'
import Link from '@/components/ui/link/link.vue'
import PillBadge from '@/components/ui/pill-badge/pill-badge.vue'
import { pages, images } from '@/config/project/index.js'

import { useBasket } from '@/stores/basket.js'
import { computed } from 'vue'

const basketStore = useBasket()

const basketItemsCount = computed(() => Object.keys(basketStore.items))
</script>

<template>
  <header>
    <Link :href="pages.home">
      <Image
        class="max-w-60 block"
        :src="images.logo"
        alt="RGD" />
    </Link>
    <div class="flex-1">
      <slot />
    </div>
    <Link class="relative" :href="pages.basket" type="secondary">
      <Icon name="shopping-cart" size="middle"/>
      <PillBadge
        v-if="basketItemsCount.length"
        size="normal">
        {{ basketItemsCount.length }}
      </PillBadge>
    </Link>
  </header>
</template>

<style lang="scss" scoped>
header {
  @apply flex items-center justify-between gap-4 bg-gradient-dark py-4 px-8 rounded;
}
</style>
