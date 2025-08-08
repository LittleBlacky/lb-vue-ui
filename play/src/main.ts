import { createApp } from 'vue'
import LbUI from '../../packages/core/index'
import '../../packages/theme-chalk/src/index.scss'
import App from './App.vue'
const app = createApp(App)
app.use(LbUI)
app.mount('#app')
