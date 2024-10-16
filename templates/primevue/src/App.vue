<script setup lang="ts">
import { watch } from 'vue'
import { useRouteStore } from './store/useRoute.ts'
import { useRouter, useRoute } from 'vue-router'

const routeStore = useRouteStore()
const router = useRouter()
const route = useRoute()

watch(
  () => route.path,
  (newPath) => {
    routeStore.toggleActive(route)
  }
)
</script>

<template>
  <router-view></router-view>
</template>
