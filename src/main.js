import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Network } from '@/core/network.js'
import { setApiInstance } from '@/core/api.js'

import apiConfig from '@/config/env/index.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const api = new Network(apiConfig)
setApiInstance(api)

app.mount('#app')
