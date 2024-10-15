import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth',  () => {
  const user = ref<any>(null)
  const isAuthenticated = ref(false)

  async function login(newUser: any) {
    user.value = newUser
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, logout }
})
