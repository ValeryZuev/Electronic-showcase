import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'
import AuthLayout from '@/layouts/auth.vue'
import HomeView from '@/views/HomeView.vue'
import pages from '@/config/project/pages.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect: { path: pages.auth },
      children: [
        {
          path: pages.home,
          name: 'home',
          component: HomeView,
          meta: { requiresAuth: true }
        },
        {
          path: pages.basket,
          name: 'basket',
          component: () => import('@/views/BasketView.vue'),
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: pages.auth,
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'auth',
          component: () => import('@/views/AuthView.vue')
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error404',
      component: () => import('@/views/404.vue')
    }
  ]
})

export default router
