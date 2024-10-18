<script setup lang="ts">
import { useHttpStore } from '../../store/useHttp.ts'
import { storeToRefs } from 'pinia'

const httpStore = useHttpStore()
const { isLoading } = storeToRefs(httpStore)
</script>

<template>
  <Transition>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  </Transition>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
