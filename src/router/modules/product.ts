import { RouteRecordRaw } from 'vue-router'

const productRouter: Array<RouteRecordRaw> = [
  {
    path: '/product-list',
    name: 'product-list',
    component: () =>
      import(
        /* webpackChunkName: "product-list" */ '@/views/product/product-list/product-list.vue'
      )
  },
  {
    path: '/product-detail/:id',
    name: 'product-detail',
    component: () =>
      import(
        /* webpackChunkName: "product-detail" */ '@/views/product/product-detail/product-detail.vue'
      )
  }
]

export default productRouter
