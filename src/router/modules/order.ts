import { RouteRecordRaw } from 'vue-router'

const orderRouter: Array<RouteRecordRaw> = [
  {
    path: '/order-list',
    name: 'order-list',
    component: () =>
      import(
        /* webpackChunkName: "order-list" */ '@/views/order/order-list/order-list.vue'
      )
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    component: () =>
      import(
        /* webpackChunkName: "order-detail" */ '@/views/order/order-detail/order-detail.vue'
      )
  },
  {
    path: '/order-create',
    name: 'order-create',
    component: () =>
      import(
        /* webpackChunkName: "order-create" */ '@/views/order/order-create/order-create.vue'
      )
  }
]

export default orderRouter
