import http from '@/utils/request'

export function getHome() {
  return http.get('/index-infos')
}
