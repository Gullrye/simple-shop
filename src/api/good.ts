import http from '@/utils/request'

export function getCategory() {
  return http.get('/categories')
}
// export function search(params) {
//   return http.get('/search', { params })
// }
export function getDetail(id: number) {
  return http.get(`/goods/detail/${id}`)
}
