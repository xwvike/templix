import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useHttpStore } from '../store/useHttp'
import { useAuthStore } from '../store/useAuth'
import type { RequestOptions, HttpResponse, ResponseError } from '../types/http'
import { useToast } from 'primevue/usetoast'

class HttpService {
  private instance: AxiosInstance
  private abortControllers: Map<string, AbortController>
  private defaultOptions: RequestOptions = {
    loading: true,
    retry: 2,
    retryDelay: 1000,
    withToken: true,
    errorMessage: true,
    successMessage: false,
  }

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.abortControllers = new Map()
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const options = (config as any).options as RequestOptions
        const httpStore = useHttpStore()
        const authStore = useAuthStore()

        const controller = new AbortController()
        config.signal = controller.signal
        this.abortControllers.set(this.getRequestKey(config), controller)

        if (options?.loading) {
          httpStore.startLoading()
        }

        if (options?.withToken) {
          const token = authStore?.user?.token || ''
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const config = response.config
        const options = (config as any).options as RequestOptions
        const httpStore = useHttpStore()

        this.abortControllers.delete(this.getRequestKey(config))

        if (options?.loading) {
          httpStore.endLoading()
        }
        if (options?.successMessage) {
          this.showMessage('success', 'Data request successful')
        }
        return response.data
      },
      async (error) => {
        const config = error.config
        const options = (config as any).options as RequestOptions
        const httpStore = useHttpStore()

        if (options?.loading) {
          httpStore.endLoading()
        }

        if (options?.retry && options.retry > 0) {
          options.retry--
          await this.sleep(options.retryDelay || 1000)
          return this.instance.request(config)
        }

        if (options?.errorMessage) {
          let message = ''
          if (error.response) {
            switch (error.response.status) {
              case 401:
                message = '未授权，请重新登录'
                break
              case 403:
                message = '拒绝访问'
                break
              case 404:
                message = '请求错误，未找到该资源'
                break
              case 500:
                message = '服务器端出错'
                break
              default:
                message = error.message
            }
          } else {
            message = error.message
          }
          this.showMessage('error', message)
        }

        return Promise.reject(error)
      }
    )
  }

  private getRequestKey(config: AxiosRequestConfig): string {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private showMessage(type: 'success' | 'error', message: string) {
    const severity = type === 'success' ? 'success' : 'error'
    useToast().add({ severity, summary: type.toUpperCase(), detail: message, life: 3000 })
  }

  // 取消请求
  public cancelRequest(config: AxiosRequestConfig) {
    const key = this.getRequestKey(config)
    const controller = this.abortControllers.get(key)
    if (controller) {
      controller.abort()
      this.abortControllers.delete(key)
    }
  }

  // 取消所有请求
  public cancelAllRequests() {
    this.abortControllers.forEach((controller) => {
      controller.abort()
    })
    this.abortControllers.clear()
  }

  // 请求方法
  public async request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const mergedOptions = { ...this.defaultOptions, ...options }
    ;(config as any).options = mergedOptions
    return this.instance.request(config)
  }

  public get<T = any>(url: string, params?: any, options?: RequestOptions): Promise<T> {
    return this.request({ method: 'GET', url, params }, options)
  }

  public post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request({ method: 'POST', url, data }, options)
  }

  public put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request({ method: 'PUT', url, data }, options)
  }

  public delete<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request({ method: 'DELETE', url, data }, options)
  }
}

// 创建实例
const http = new HttpService({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default http
