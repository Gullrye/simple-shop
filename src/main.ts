import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'nprogress/nprogress.css'
import { Button } from 'vant'
const app = createApp(App)
app.use(store).use(router).mount('#app')
app.use(Button)
