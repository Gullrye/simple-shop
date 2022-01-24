import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import router from '@/router'
import { Toast } from 'vant'
import NProgress from 'nprogress'
import cache from '@/utils/cache'

interface DataType {
  data: any
  message: string
  resultCode: number
}
interface ResultType {
  status?: number
  data: DataType
  statusText?: string
  err?: string
}
interface Http {
  get(url: string, params?: any): Promise<DataType>
  post(url: string, params?: Record<string, unknown>): Promise<ResultType>
  put(url: string, params?: Record<string, unknown>): Promise<ResultType>
  delete(url: string): Promise<DataType>
}

/**
 * 基础配置及拦截器
 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 5000
})
service.interceptors.request.use(
  (config: any): AxiosRequestConfig<any> => {
    const token = cache.getCache('token')
    if (token) {
      config.headers.token = token // 本项目需要设置
      // config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return error
  }
)
// 响应拦截
service.interceptors.response.use((res: ResultType) => {
  const data: DataType = res.data
  if (typeof data !== 'object') {
    Toast.fail('服务端异常')
    return Promise.reject(res)
  }
  if (data.resultCode !== 200) {
    if (data.resultCode === 500) {
      Toast.fail(data.message)
    }
    if (data.message && data.resultCode !== 500) {
      Toast.fail(data.message)
    }
    if (
      data.resultCode === 416 &&
      window.location.hash !== '#/home' &&
      window.location.hash !== '#/category'
    ) {
      // 返回 416 代表没有登录状态，路由跳转到 /login 页面
      router.push({ path: '/login' })
    }
    return Promise.reject(data)
  }
  return res
})

/**
 * 顶部进度条配置
 */
const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      service
        .get(url, params)
        .then(res => {
          NProgress.done()
          resolve(res.data)
        })
        .catch(err => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      service
        .post(url, params)
        .then(res => {
          NProgress.done()
          resolve(res.data)
        })
        .catch(err => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      service
        .put(url, params)
        .then(res => {
          NProgress.done()
          resolve(res.data)
        })
        .catch(err => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  delete(url) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      service
        .delete(url)
        .then(res => {
          NProgress.done()
          resolve(res.data)
        })
        .catch(err => {
          NProgress.done()
          reject(err.data)
        })
    })
  }
}
export default http
