import http from '@/utils/request'

export function getOrderList(params: any) {
  return http.get('/order', params)
}
export function getOrderDetail(id: any) {
  return http.get(`/order/${id}`)
}
export function cancelOrder(id: any) {
  return http.put(`/order/${id}/cancel`)
}
export function confirmOrder(id: any) {
  return http.put(`/order/${id}/finish`)
}
export function payOrder(params: any) {
  return http.get('/paySuccess', { params })
}
export function createOrder(params: any) {
  return http.post('/saveOrder', params)
}
