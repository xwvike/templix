<script setup lang="ts">
import { toRefs } from 'vue'
import { useSidebarStore } from '../store/useSidebar.ts'
import { useRouteStore } from '../store/useRoute.ts'
import HistoryTabs from './HistoryTabs.vue'

const routeStore = useRouteStore()
const sidebarStore = useSidebarStore()


const { active, history } = toRefs(routeStore)

</script>

<template>
  <div class="px-5 pt-3 pb-4 flex items-center justify-between border-b max-md:px-0">
    <div class="flex w-full items-center gap-2">
      <div class="md:hidden h-full flex items-center">
        <i @click.stop="sidebarStore.open()" class="pi pi-bars cursor-pointer "></i>
      </div>
      <Divider v-if="history.length>0" class="md:!hidden" layout="vertical" />
      <HistoryTabs/>
    </div>
  </div>
</template>

<style scoped></style>
