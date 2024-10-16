import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const Expanded = ref(false)
  const clientWidth = ref(window.innerWidth)
  function open() {
    if (clientWidth.value > 768) return
    Expanded.value = true
  }
  function close() {
    if (clientWidth.value > 768) return
    Expanded.value = false
  }
  window.addEventListener('resize', () => {
    clientWidth.value = window.innerWidth
  })
  return { Expanded, clientWidth, open, close }
})
