import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'nprogress/nprogress.css'

import {
  Button,
  Form,
  Field,
  Toast,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  List,
  PullRefresh,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Badge,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  SwipeCell,
  Stepper,
  Popup,
  AddressList,
  AddressEdit,
  Card,
  Lazyload
} from 'vant'

const components = [
  Button,
  Form,
  Field,
  Toast,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  List,
  PullRefresh,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Badge,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  SwipeCell,
  Stepper,
  Popup,
  AddressList,
  AddressEdit,
  Card,
  Lazyload
]

const app = createApp(App)

for (const cpn of components) {
  app.use(cpn)
}
app.use(Lazyload, {
  lazyComponent: true
})
app.use(store).use(router).mount('#app')
