import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import addressRouter from './modules/address'
import productRouter from './modules/product'
import orderRouter from './modules/order'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/home/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  },
  {
    path: '/category',
    name: 'category',
    meta: {
      keepAlive: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "category" */ '@/views/category/category.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () =>
      import(/* webpackChunkName: "cart" */ '@/views/cart/cart.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () =>
      import(/* webpackChunkName: "user" */ '@/views/user/user.vue')
  },
  // 关于我们
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/about/about.vue')
  },
  // 账号管理
  {
    path: '/account-setting',
    name: 'account-setting',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '@/views/account-setting/account-setting.vue'
      )
  },
  ...addressRouter,
  ...productRouter,
  ...orderRouter
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(to => {
  // console.log(to, from)
  if (to.name === 'product') {
    window.scrollTo(0, 0)
  }
})

export default router
