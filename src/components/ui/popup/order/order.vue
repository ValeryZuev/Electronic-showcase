<script setup>
import Button from '@/components/ui/button/button.vue'
import { usePopup } from '@/stores/popup'
const { close } = usePopup()
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    Ваш заказ успешно оформлен!
    <Button
      type="red"
      @click="close">
      Закрыть
    </Button>
  </div>
</template>
