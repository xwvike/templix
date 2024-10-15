<script setup lang="ts">
import {useNavStore} from '../store/useNav.ts'
const navStore = useNavStore()
</script>

<template>
  <div class="px-5 pt-3 pb-4 flex items-center justify-between border-b max-md:px-0">
    <div class="flex items-center gap-3">
      <i @click.stop="navStore.open()" class="pi pi-bars cursor-pointer"></i>
      <div class="flex flex-col justify-between">
        <h1 class="font-medium text-xl text-surface-900">hello</h1>
        <p class="text-base text-surface-500">world</p>
      </div>
    </div>
    <div>
      <InputText class="w-72" type="text" />
    </div>
  </div>
</template>

<style scoped>

</style>