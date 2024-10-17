import {defineStore} from 'pinia'
import {reactive} from 'vue'

export const useToastCommonStore = defineStore('toastCommon', ()=>{
  const toasts = reactive({
    list:[]
  })
})