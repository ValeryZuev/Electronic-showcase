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
      <div class="flex items-center justify-between text-xl mt-auto">
        {{ data.price }} ₽
        <Button type="red" size="small">
          <Icon name="add-shopping-cart" size="normal"/>
        </Button>
      </div>
    </div>
  </div>
</template>
