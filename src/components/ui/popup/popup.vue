<script setup>
import Icon from '@/components/ui/icon/icon.vue'
import Order from '@/components/ui/popup/order/order.vue'

import { usePopup } from '@/stores/popup.js'
import { computed  } from "vue";

const popupStore = usePopup()

const components = {
  order: Order,
}
const titles = computed(() => {
  return {
    order: `Заказ №${Math.floor(Math.random() * 1000)}`,
  }
})
const close = () => {
  popupStore.close()
}
</script>

<template>
  <transition name="fade">
    <!-- Popup overlay -->
    <div
      v-if="popupStore.type && components[popupStore.type]"
      class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black-base/30 backdrop-blur-sm cursor-pointer"
      @click="close" />
  </transition>
  <transition name="fade">
    <div
      v-if="popupStore.type && components[popupStore.type]"
      class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col max-w-[80%] max-h-[80%]
        min-w-[600px] px-5 pt-4 pb-6 bg-gradient-dark shadow-400 rounded-sm">
      <!-- Popup header -->
      <div
        class="flex justify-center items-center"
        :class="[titles[popupStore.type] ? 'mb-[30px]' : 'mb-[5px]']">
        <div
          class="font-montserrat font-medium uppercase">
          {{ titles[popupStore.type] }}
        </div>
        <Icon
          class="absolute top-4 right-4 w-[11px] h-[11px] text-light-100 cursor-pointer"
          name="close"
          size="normal"
          @click="close" />
      </div>
      <!-- Popup component -->
      <component
        class="w-full h-full"
        :is="components[popupStore.type]" />
    </div>
  </transition>
</template>
