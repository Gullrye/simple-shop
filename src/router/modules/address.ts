import { RouteRecordRaw } from 'vue-router'

const addressRouter: Array<RouteRecordRaw> = [
  {
    path: '/address-list',
    name: 'address-list',
    component: () =>
      import(
        /* webpackChunkName: "address-list" */ '@/views/address/address-list/address-list.vue'
      )
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    component: () =>
      import(
        /* webpackChunkName: "address-edit" */ '@/views/address/address-edit/address-edit.vue'
      )
  }
]

export default addressRouter
