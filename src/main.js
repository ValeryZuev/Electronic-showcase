import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Network } from '@/core/network.js'
import { setApiInstance } from '@/core/api.js'

import apiConfig from '@/config/env/index.js'
import App from './App.vue'
import router from './router'
import { pages } from '@/config/project/index.js'
import { routerAuthController } from '@/router/middlewares/AuthController.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const api = new Network(apiConfig)
setApiInstance(api)

router.beforeEach((to, from, next) => {
  routerAuthController(to, next)
})

app.mount('#app')
