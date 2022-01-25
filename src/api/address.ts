import http from '@/utils/request'

export function getAddressList() {
  return http.get('/address', { pageNumber: 1, pageSize: 1000 })
}
export function addAddress(params: any) {
  return http.post('/address', params)
}
export function editAddress(params: any) {
  return http.put('/address', params)
}
export function getAddressDetail(id: any) {
  return http.get(`/address/${id}`)
}
export function deleteAddress(id: any) {
  return http.delete(`/address/${id}`)
}
export function getDefaultAddress() {
  return http.get('/address/default')
}
