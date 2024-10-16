<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore } from '../store/useRoute.ts'

const routeStore = useRouteStore()
const router = useRouter()
const { history, active } = toRefs(routeStore)
const removeHistory = (item: any) => {
  routeStore.deleteHistory(item)
}
const routeEvent = (item: any) => {
  router.push(item.path)
}
</script>

<template>
  <div
    class="relative scrollbar-thin max-md:scrollbar-none card pb-1 w-2/3 flex gap-2 overflow-y-hidden overflow-x-auto items-center"
  >
    <Chip
      @click="routeEvent(item)"
      v-for="item in history"
      class="cursor-pointer"
      :class="[active.meta._id === item.meta._id ? '!bg-primary !text-white' : '']"
    >
      {{ item.meta.title }}
      <i
        @click.stop="removeHistory(item)"
        class="pi pi-times hover:bg-gray-200 p-0.5 rounded-sm"
        :class="[active.meta._id === item.meta._id ? 'hover:!text-black' : '']"
      ></i>
    </Chip>
  </div>
</template>

<style scoped></style>
