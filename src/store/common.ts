import { defineStore } from 'pinia'
import { getCart } from '@/api/cart'

export const useCommonStore = defineStore({
  id: 'store',
  state: () => {
    return {
      cartCount: 0,
      keyword: ''
    }
  },
  actions: {
    async updateCart() {
      const { data } = await getCart()
      this.cartCount = data.length || 0
    },
    updateKeyword(val: string) {
      this.keyword = val
    }
  }
})
