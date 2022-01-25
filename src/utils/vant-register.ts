import { App } from 'vue'
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

function registerVant(app: App): void {
  for (const cpn of components) {
    app.use(cpn)
  }
  app.use(Lazyload, {
    lazyComponent: true
  })
}

export default registerVant
