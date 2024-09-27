<script setup>
import Button from '@/components/ui/button/button.vue'
import Icon from '@/components/ui/icon/icon.vue'
import Image from '@/components/ui/image/image.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['onAddToCart', 'onChangeItemCart'])
</script>

<template>
  <div class="flex flex-col rounded overflow-hidden bg-gradient-dark">
    <div class="shrink-0 w-full h-60 bg-white-base p-4">
      <Image class="block w-full h-full" :src="data.image" :alt="data.title" />
    </div>
    <div class="flex flex-col h-full gap-4 px-4 py-4">
      <div class="">
        {{ data.title }}
      </div>

      <div
        class="flex items-center justify-between text-xl mt-auto">
        {{ data.price }} ₽
        <div
          v-if="data.count"
          class="flex items-center gap-4">
          <Icon
            class="cursor-pointer hover:text-red-base"
            name="minus"
            @click="emit('onChangeItemCart', { id: data.id, type: 'dec' })" />
          {{ data.count }}
          <Icon
            class="cursor-pointer hover:text-red-base"
            name="plus"
            @click="emit('onChangeItemCart', { id: data.id, type: 'inc' })" />
        </div>
        <Button
          v-else
          type="red"
          size="small"
          @click="emit('onAddToCart', data)">
          <Icon name="add-shopping-cart" size="normal"/>
        </Button>
      </div>
    </div>
  </div>
</template>
