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
    class="relative scrollbar-thin max-md:scrollbar-none card pb-1 w-5/6 flex gap-2 overflow-y-hidden overflow-x-auto items-center"
  >
    <Chip
      @click="routeEvent(item)"
      v-for="item in history"
      class="cursor-pointer transition-colors duration-200 dark:border-gray-600 "
      :class="[
        active.meta._id === item.meta._id
          ? 'dark:!bg-primary dark:!text-gray-900'
          : 'hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200'
      ]"
    >
      {{ item.meta.title }}
      <i
        @click.stop="removeHistory(item)"
        class="pi pi-times hover:bg-gray-200 dark:hover:bg-gray-500 p-0.5 rounded-sm transition-colors duration-200"
        :class="[
          active.meta._id === item.meta._id
            ? 'hover:!text-black dark:hover:!text-white'
            : 'dark:text-gray-300 dark:hover:text-white'
        ]"
      ></i>
    </Chip>
  </div>
</template>

<style scoped></style>