import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHttpStore = defineStore('http', () => {
  const loadingCount = ref(0)
  const isLoading = ref(false)
  const startLoading = () => {
    loadingCount.value++
    isLoading.value = true
  }

  const endLoading = () => {
    loadingCount.value--
    if (loadingCount.value <= 0) {
      loadingCount.value = 0
      isLoading.value = false
    }
  }

  return {
    isLoading,
    startLoading,
    endLoading
  }
})