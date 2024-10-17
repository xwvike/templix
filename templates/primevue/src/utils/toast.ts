import { ToastServiceMethods } from 'primevue/toastservice'
import type { App } from 'vue'

let toastInstance: ToastServiceMethods | null = null

export const initToast = (app: App) => {
  toastInstance = app.config.globalProperties.$toast
}

class ToastService {
  private checkInstance() {
    if (!toastInstance) {
      throw new Error('Toast service not initialized. Please call initToast first.')
    }
  }

  success(message: string, title = '成功') {
    this.checkInstance()
    toastInstance!.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: 3000
    })
  }

  error(message: string, title = '错误') {
    this.checkInstance()
    toastInstance!.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 3000
    })
  }

  warn(message: string, title = '警告') {
    this.checkInstance()
    toastInstance!.add({
      severity: 'warn',
      summary: title,
      detail: message,
      life: 3000
    })
  }

  info(message: string, title = '提示') {
    this.checkInstance()
    toastInstance!.add({
      severity: 'info',
      summary: title,
      detail: message,
      life: 3000
    })
  }

  show(options: any) {
    this.checkInstance()
    toastInstance!.add(options)
  }

  clear() {
    this.checkInstance()
    toastInstance!.removeAllGroups()
  }
}
export const toast = new ToastService()