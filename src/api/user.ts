import http from '@/utils/request'

function getUserInfo() {
  return http.get('/user/info')
}

function login(params: Record<string, unknown>) {
  return http.post('/user/login', params)
}

function logout() {
  return http.post('/user/logout')
}

function register(params: Record<string, unknown>) {
  return http.post('/user/register', params)
}
function editUserInfo(params: Record<string, unknown>) {
  return http.put('/user/info', params)
}

export { getUserInfo, login, logout, register, editUserInfo }
