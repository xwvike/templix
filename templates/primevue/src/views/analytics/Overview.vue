<script setup lang="ts">
import http from '../../utils/http.ts'
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
onMounted(() => {
  http.get('https://api.github.com/users/yyx990803/repos3').then((res) => {
    console.log(res)
  })
  setTimeout(() => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Operation completed' })
  }, 3000)
})
</script>

<template>
  <div class="w-screen h-40 bg-primary"></div>
</template>

<style scoped></style>
