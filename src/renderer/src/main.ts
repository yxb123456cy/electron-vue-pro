import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'

const app = createApp(App)
// 使用Pinia
app.use(pinia)
app.use(router)
app.mount('#app')
