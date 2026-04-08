import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'

const app = createApp(App)
// 使用Pinia
app.use(pinia)
app.mount('#app')
