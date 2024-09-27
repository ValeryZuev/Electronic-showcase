<script setup>
import Empty from '@/components/blocks/layout/empty.vue'
import Product from '@/components/blocks/product/product.vue'
import ProductLoader from '@/components/ui/loader/loader.vue'
import Sidebar from '@/components/blocks/sidebar/sidebar.vue'

import { useShowcase } from '@/stores/showcase.js'
import { onMounted } from "vue";

const showcaseStore = useShowcase()

onMounted(() => {
  showcaseStore.getCategories();
  showcaseStore.setDefaultFilterValues();
  showcaseStore.getProducts()
});
</script>

<template>
  <section class="grid grid-cols-[300px,_1fr] items-start gap-8">
    <Sidebar
      class="sticky top-4"
      :filters="showcaseStore.filters"
      @onApplyFilters="showcaseStore.applyFilters"
      @onResetFilters="showcaseStore.resetFilters" />
    <div class="flex flex-col gap-8 h-full">
      <div>
        <h1>{{ showcaseStore.currentCategory?.label }}</h1>
      </div>
      <div v-if="showcaseStore.products.length" class="grid grid-cols-4 gap-8">
        <ProductLoader
          v-for="(item, index) of showcaseStore.products"
          :key="item?.id ?? index"
          :loading="showcaseStore.isLoading">
          <Product :data="item" />
        </ProductLoader>
      </div>
      <Empty v-else>
      </Empty>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
