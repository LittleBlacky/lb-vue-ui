import { createApp } from 'vue'
import App from './App.vue'
import LbUI from '@littleblacky/lb-vue-ui'
import '@littleblacky/lb-vue-ui/style'

const app = createApp(App)
app.use(LbUI)

app.mount('#app')
