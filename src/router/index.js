import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'
import HomeView from '@/views/HomeView.vue'
import pages from '@/config/project/pages.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: pages.home,
          name: 'home',
          component: HomeView
        },
        {
          path: pages.basket,
          name: 'basket',
          component: () => import('@/views/BasketView.vue')
        },
      ]
    },
    {
      path: pages.auth,
      name: 'auth',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error404',
      component: () => import('@/views/404.vue')
    }
  ]
})

export default router
