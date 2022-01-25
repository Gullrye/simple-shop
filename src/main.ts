import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'nprogress/nprogress.css'
import '@/assets/iconfont/iconfont.css'
import registerVant from '@/utils/vant-register'

const app = createApp(App)
app.use(registerVant)
app.use(store).use(router).mount('#app')
