<script setup>
import Header from '@/components/blocks/layout/header.vue'
import Footer from '@/components/blocks/layout/footer.vue'
</script>

<template>
  <div class="container flex flex-col gap-4 pt-4 flex-1">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer>
      &#169; {{ new Date().getFullYear() }} Все права защищены.
    </Footer>
  </div>
</template>
