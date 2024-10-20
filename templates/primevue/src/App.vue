<script setup lang="ts">
import { watch } from 'vue'
import { useRouteStore } from './store/useRoute.ts'
import { useRouter, useRoute } from 'vue-router'
import GlobalLoading from './components/common/GlobalLoading.vue'

const routeStore = useRouteStore()
const router = useRouter()
const route = useRoute()

watch(
  () => route.path,
  (newPath) => {
    routeStore.toggleActive(route,'route')
  }
)
</script>

<template>
  <router-view></router-view>
  <GlobalLoading/>
  <Toast />
</template>
