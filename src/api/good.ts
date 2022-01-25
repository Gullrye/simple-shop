import http from '@/utils/request'

export function getCategory() {
  return http.get('/categories')
}
export function search(params: any) {
  return http.get('/search', { params })
}
export function getDetail(id: any) {
  return http.get(`/goods/detail/${id}`)
}
