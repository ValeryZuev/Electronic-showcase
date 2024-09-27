<script setup>
import Button from '@/components/ui/button/button.vue'
import Empty from '@/components/blocks/layout/empty.vue'
import Icon from '@/components/ui/icon/icon.vue'
import Image from '@/components/ui/image/image.vue'
import Link from '@/components/ui/link/link.vue'
import Table from '@/components/ui/table/table.vue'

import { pages } from '@/config/project/index.js'
import { useBasket } from '@/stores/basket.js'

const basketStore = useBasket()

const header = [
  { id: 'index', title: '№'},
  { id: 'title', title: 'Наименование товара'},
  { id: 'count', title: 'Количество'},
  { id: 'price', title: 'Ценв за ед.'},
  { id: 'total', title: 'Итого'}
]
</script>

<template>
  <section
    v-if="Object.keys(basketStore.items).length"
    class="flex flex-col gap-4">
    <h1>Товары в корзине</h1>
    <Table
      :header="header"
      :data="basketStore.items">
      <template #row-index="{ index }">
        {{ index }}
      </template>
      <template #row-title="{ title, image }">
        <div class="flex items-center gap-4">
          <div class="shrink-0 w-20 h-20 bg-white-base p-1 rounded-sm">
            <Image
              class="block w-full h-full"
              :src="image"
              :alt="title" />
          </div>
          {{ title }}
        </div>
      </template>
      <template #row-count="{ id, count }">
        <div class="inline-flex items-center gap-4">
          <Icon
            class="cursor-pointer hover:text-red-base"
            name="minus"
            @click="basketStore.changeCountItem(id, 'dec')" />
          {{ count }}
          <Icon
            class="cursor-pointer hover:text-red-base"
            name="plus"
            @click="basketStore.changeCountItem(id, 'inc')" />
        </div>
      </template>
      <template #row-total="{ price, count }">
        {{ (price * count).toFixed(2) }}
      </template>
    </Table>

    <div class="flex items-center justify-between gap-2">
      <h4 class="mb-0">
        Всего товаров {{ basketStore.sumOfCounts.count }} на сумму {{ basketStore.sumOfCounts.sum.toFixed(2) }} ₽
      </h4>
      <Button
        type="red">
        Оформить заказ
      </Button>
    </div>
  </section>
  <Empty v-else>
    <div class="flex flex-col items-center gap-8 text-2xl">
      Корзина пуста
      <Link
        :href="pages.home"
        type="red-outline"
        size="middle">
        К покупкам
      </Link>
    </div>
  </Empty>
</template>
