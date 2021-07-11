import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import toast from '@/components/toast'

import "amfe-flexible/index.js"
import '@/assets/styles/index.js'
import { isEnvLocal } from '@/utils/env-var.js'

import VConsole from 'vconsole'
if (isEnvLocal) {
  new VConsole()
}
const app = createApp(App)
app.use(router)
app.use(toast)
app.mount('#app')
