import http from '../utils/request'

export function addCart(params: { goodsCount: number; goodsId: number }) {
  return http.post('shop-cart', params)
}
export function getCart() {
  return http.get('shop-cart')
}
export function deleteCartItem(id: number) {
  return http.delete('shop-cart/' + id)
}
export function modifyCart(params: { cartItemId: any; goodsCount: any }) {
  return http.put('shop-cart', params)
}
export function getByCartItemIds(params: any) {
  return http.get('/shop-cart/settle', { params })
}
