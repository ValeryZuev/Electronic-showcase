<script setup>
import Header from '@/components/blocks/layout/header.vue'
import Footer from '@/components/blocks/layout/footer.vue'
import Popup from '@/components/ui/popup/popup.vue'
</script>

<template>
  <div class="container flex flex-col gap-4 pt-4 flex-1">
    <Header />
    <main class="flex flex-col">
      <RouterView />
    </main>
    <Footer>
      &#169; {{ new Date().getFullYear() }} Все права защищены.
    </Footer>
  </div>
  <Popup />
</template>
